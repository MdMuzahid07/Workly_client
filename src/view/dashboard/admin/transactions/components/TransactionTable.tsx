"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Download, Eye, MoreVertical, Receipt } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ==================== Types ====================

export interface MappedTransaction {
  id: string; // tranId
  company: string;
  logo: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  plan: string;
  method: string;
}

export interface RawTransaction {
  tranId: string;
  valId?: string | null;
  bankTranId?: string | null;
  cardType?: string | null;
  amount: number;
  currency: string;
  status: string; // raw DB enum
  planId: string;
  category: string;
  riskLevel?: number;
  createdAt: string;
  user?: { fullName: string; email: string };
  company?: { name: string; logoUrl?: string | null };
}

interface TransactionTableProps {
  transactions: MappedTransaction[];
  rawTransactions: RawTransaction[];
}

// ==================== Helpers ====================

const getStatusStyles = (status: string) => {
  switch (status) {
    case "PAID":
      return "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900";
    case "OVERDUE":
      return "bg-rose-50 text-rose-600 border-rose-100 shadow-sm shadow-rose-50 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900";
    case "ABANDONED":
      // Orphaned checkout — user opened payment page but never completed it
      return "bg-violet-50 text-violet-500 border-violet-100 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-900";
    case "CANCELLED":
      return "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-900/40 dark:text-slate-400";
    case "REFUNDED":
      return "bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-900/40 dark:text-slate-400";
    default:
      return "bg-muted text-muted-foreground border-transparent opacity-50";
  }
};

/** Build a readable plain-text receipt for a transaction */
const buildReceiptText = (
  mapped: MappedTransaction,
  raw: RawTransaction,
): string => {
  const separator = "─".repeat(48);
  return [
    "WORKLY — PAYMENT RECEIPT",
    separator,
    `Invoice ID   : ${mapped.id}`,
    `Date         : ${mapped.date}`,
    separator,
    `Customer     : ${raw.user?.fullName || mapped.company}`,
    `Email        : ${raw.user?.email || "N/A"}`,
    `Company      : ${raw.company?.name || "N/A"}`,
    separator,
    `Plan         : ${mapped.plan}`,
    `Category     : ${raw.category}`,
    `Amount       : ${mapped.currency}${mapped.amount.toLocaleString("en-BD")}`,
    `Currency     : ${raw.currency}`,
    `Payment Method: ${mapped.method}`,
    `Status       : ${mapped.status}`,
    separator,
    `Transaction ID: ${raw.tranId}`,
    raw.valId ? `Validation ID : ${raw.valId}` : null,
    raw.bankTranId ? `Bank Tran ID  : ${raw.bankTranId}` : null,
    raw.riskLevel !== undefined ? `Risk Level   : ${raw.riskLevel}` : null,
    separator,
    "This is an automatically generated receipt.",
    "For disputes, contact support@workly.io",
  ]
    .filter(Boolean)
    .join("\n");
};

/** Trigger a browser download of a text file */
const downloadTextFile = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// ==================== View Details Dialog ====================

function TransactionDetailsDialog({
  mapped,
  raw,
  open,
  onClose,
}: {
  mapped: MappedTransaction;
  raw: RawTransaction;
  open: boolean;
  onClose: () => void;
}) {
  const rows: { label: string; value: string; mono?: boolean }[] = [
    { label: "Transaction ID", value: raw.tranId, mono: true },
    {
      label: "Validation ID",
      value: raw.valId || "Not validated yet",
      mono: true,
    },
    { label: "Bank Tran ID", value: raw.bankTranId || "N/A", mono: true },
    { label: "Customer", value: raw.user?.fullName || mapped.company },
    { label: "Email", value: raw.user?.email || "N/A" },
    { label: "Company", value: raw.company?.name || "N/A" },
    { label: "Plan", value: mapped.plan },
    { label: "Category", value: raw.category },
    {
      label: "Amount",
      value: `${mapped.currency}${mapped.amount.toLocaleString("en-BD")}`,
    },
    { label: "Currency", value: raw.currency },
    { label: "Payment Method", value: mapped.method },
    { label: "Status", value: mapped.status },
    { label: "Risk Level", value: String(raw.riskLevel ?? 0) },
    { label: "Date", value: mapped.date },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
              <Receipt className="text-primary h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">
                Transaction Details
              </DialogTitle>
              <p className="text-muted-foreground text-xs">{raw.tranId}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-2 divide-y rounded-xl border">
          {rows.map(({ label, value, mono }) => (
            <div
              key={label}
              className="flex items-start justify-between gap-4 px-4 py-3"
            >
              <span className="text-muted-foreground min-w-[110px] shrink-0 text-xs font-medium">
                {label}
              </span>
              <span
                className={`text-right text-xs font-semibold break-all ${mono ? "font-mono" : ""}`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full rounded-full font-bold"
            onClick={() => {
              downloadTextFile(
                `receipt-${raw.tranId}.txt`,
                buildReceiptText(mapped, raw),
              );
              toast.success("Receipt downloaded");
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ==================== Main Table ====================

export function TransactionTable({
  transactions,
  rawTransactions,
}: TransactionTableProps) {
  const [detailTx, setDetailTx] = useState<{
    mapped: MappedTransaction;
    raw: RawTransaction;
  } | null>(null);

  const openDetails = (mapped: MappedTransaction) => {
    const raw = rawTransactions.find((r) => r.tranId === mapped.id);
    if (raw) setDetailTx({ mapped, raw });
  };

  const handleDownload = (mapped: MappedTransaction) => {
    const raw = rawTransactions.find((r) => r.tranId === mapped.id);
    if (!raw) {
      toast.error("Could not find raw transaction data.");
      return;
    }
    downloadTextFile(`receipt-${mapped.id}.txt`, buildReceiptText(mapped, raw));
    toast.success(`Receipt for ${mapped.id} downloaded.`);
  };

  return (
    <>
      <div className="bg-card overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40 border-b">
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-12 w-[200px] text-[10px] font-bold tracking-widest uppercase opacity-70">
                  Invoice ID
                </TableHead>
                <TableHead className="h-12 text-[10px] font-bold tracking-widest uppercase opacity-70">
                  Customer
                </TableHead>
                <TableHead className="h-12 text-[10px] font-bold tracking-widest uppercase opacity-70">
                  Amount
                </TableHead>
                <TableHead className="h-12 text-[10px] font-bold tracking-widest uppercase opacity-70">
                  Status
                </TableHead>
                <TableHead className="h-12 text-[10px] font-bold tracking-widest uppercase opacity-70">
                  Method
                </TableHead>
                <TableHead className="h-12 pr-8 text-right text-[10px] font-bold tracking-widest uppercase opacity-70">
                  Manage
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="group hover:bg-muted/40 border-b transition-colors last:border-0"
                >
                  {/* Invoice ID + Date */}
                  <TableCell className="py-4 font-bold">
                    <div className="space-y-0.5">
                      <p className="font-mono text-xs font-bold">{tx.id}</p>
                      <p className="text-muted-foreground text-[10px] font-medium opacity-60">
                        {tx.date}
                      </p>
                    </div>
                  </TableCell>

                  {/* Customer */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="ring-border h-8 w-8 ring-1">
                        <AvatarImage src={tx.logo} />
                        <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-bold">
                          {tx.company.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {tx.company}
                        </p>
                        <p className="text-muted-foreground truncate text-[10px] font-medium opacity-50">
                          {tx.plan}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Amount */}
                  <TableCell>
                    <div className="text-foreground text-base font-bold">
                      {tx.currency === "BDT" || tx.currency === "৳" ? "৳" : "$"}
                      {tx.amount.toLocaleString("en-BD")}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      className={`rounded-full border px-3 py-0.5 text-[9px] font-bold tracking-widest uppercase ${getStatusStyles(tx.status)}`}
                      variant="outline"
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>

                  {/* Method */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-70">
                      <CreditCard className="h-3 w-3 opacity-40" />
                      {tx.method}
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Quick download */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:text-primary h-8 w-8 rounded-lg"
                        title="Download Receipt"
                        onClick={() => handleDownload(tx)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>

                      {/* More actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="hover:bg-muted h-8 w-8 rounded-lg"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-52 rounded-xl border p-2 shadow-lg"
                        >
                          <DropdownMenuLabel className="px-3 pb-2 text-[10px] font-bold tracking-widest uppercase opacity-50">
                            Actions
                          </DropdownMenuLabel>

                          {/* View Details — opens full dialog */}
                          <DropdownMenuItem
                            className="cursor-pointer rounded-lg py-2 font-bold"
                            onClick={() => openDetails(tx)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {transactions.length === 0 && (
          <div className="bg-muted/5 flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-primary/10 text-primary/40 mb-6 rounded-4xl p-8 shadow-inner">
              <Receipt className="h-12 w-12" strokeWidth={1} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">
              No transactions found
            </h3>
            <p className="text-muted-foreground mx-auto mt-2 max-w-sm font-medium opacity-60">
              No transactions match the selected filters.
            </p>
          </div>
        )}
      </div>

      {/* Details dialog */}
      {detailTx && (
        <TransactionDetailsDialog
          mapped={detailTx.mapped}
          raw={detailTx.raw}
          open={true}
          onClose={() => setDetailTx(null)}
        />
      )}
    </>
  );
}
