"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import {
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  FileText,
  MoreVertical,
  Receipt,
  RotateCcw,
} from "lucide-react";

interface Transaction {
  id: string;
  company: string;
  logo: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  plan: string;
  method: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "PAID":
      return "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-50";
    case "UNPAID":
      return "bg-amber-50 text-amber-600 border-amber-100 shadow-sm shadow-amber-50";
    case "OVERDUE":
      return "bg-rose-50 text-rose-600 border-rose-100 shadow-sm shadow-rose-50";
    case "REFUNDED":
      return "bg-slate-50 text-slate-600 border-slate-100";
    default:
      return "bg-muted text-muted-foreground border-transparent opacity-50";
  }
};

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
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
                <TableCell className="py-4 font-bold">
                  <div className="space-y-1">
                    <p className="font-bold">{tx.id}</p>
                    <p className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase opacity-60">
                      {tx.date}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="ring-border h-8 w-8 ring-1">
                      <AvatarImage src={tx.logo} />
                      <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-bold">
                        {tx.company.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{tx.company}</p>
                      <p className="text-muted-foreground truncate text-[10px] font-medium opacity-50">
                        {tx.plan}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-foreground text-base font-bold">
                    {tx.currency === "BDT" || tx.currency === "৳" ? "৳" : "$"}
                    {tx.amount.toLocaleString("en-BD")}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`rounded-full border px-3 py-0.5 text-[9px] font-bold tracking-widest uppercase ${getStatusStyles(tx.status)}`}
                    variant="outline"
                  >
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase opacity-70">
                    <CreditCard className="h-3 w-3 opacity-40" />
                    {tx.method}
                  </div>
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:text-primary h-8 w-8 rounded-lg"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
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
                        <DropdownMenuItem className="cursor-pointer rounded-lg py-2 font-bold">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer rounded-lg py-2 font-bold">
                          <FileText className="mr-2 h-4 w-4" />
                          PDF Statement
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-primary cursor-pointer rounded-lg py-2 font-bold">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View SSLCommerz
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 border-dashed" />
                        <DropdownMenuItem className="cursor-pointer rounded-lg py-2 font-bold">
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Issue Refund
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive cursor-pointer rounded-lg py-2 font-bold">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Void Invoice
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
  );
}
