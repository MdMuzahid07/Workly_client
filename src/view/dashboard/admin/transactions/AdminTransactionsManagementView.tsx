"use client";

import DashboardAdminTransactionsHeader from "@/components/dashboard/dashboard-nav/header/DashboardAdminTransactionsHeader";
import PaginationBar from "@/components/shared/PaginationBar";
import { Button } from "@/components/ui/button";
import { useGetTransactionsQuery } from "@/redux/feature/payment/paymentApi";
import AdminPlansSkeleton from "@/skeleton/dashboard/admin/AdminPlansSkeleton";
import debounce from "debounce";
import { AlertTriangle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FinancialStatsGrid } from "./components/FinancialStatsGrid";
import { TransactionFilterBar } from "./components/TransactionFilterBar";
import { TransactionTable } from "./components/TransactionTable";

const formatPlanName = (planId: string) => {
  if (!planId) return "N/A";
  const mapped: Record<string, string> = {
    emp_free: "Employer Free",
    emp_starter: "Employer Starter",
    emp_pro: "Employer Professional",
    free: "Free Plan",
    starter: "Starter Plan",
    pro: "Pro Seeker Package",
    enterprise: "Enterprise Plan",
  };
  return mapped[planId.toLowerCase()] || planId;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapTransaction = (tx: any) => {
  let dateStr = "N/A";
  if (tx.createdAt) {
    try {
      dateStr = new Date(tx.createdAt).toISOString().split("T")[0];
    } catch {
      dateStr = String(tx.createdAt).substring(0, 10);
    }
  }

  let statusStr = tx.status;
  if (tx.status === "VALIDATED") {
    statusStr = "PAID";
  } else if (tx.status === "PENDING") {
    statusStr = "UNPAID";
  } else if (tx.status === "PENDING_REVIEW") {
    statusStr = "OVERDUE";
  } else if (tx.status === "FAILED") {
    statusStr = "REFUNDED";
  }

  const methodStr = `${tx.cardType || "Online"} (SSLCommerz)`;

  return {
    id: tx.tranId,
    company: tx.company?.name || tx.user?.fullName || "N/A",
    logo: tx.company?.logoUrl || "",
    amount: tx.amount,
    currency: tx.currency === "BDT" ? "৳" : tx.currency,
    status: statusStr,
    date: dateStr,
    plan: formatPlanName(tx.planId),
    method: methodStr,
  };
};

const AdminTransactionsManagementView = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // 300ms debounce — prevents API call on every keystroke
  const applyDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setPage(1); // Reset page on new search query
      }, 300),
    [],
  );

  useEffect(() => {
    applyDebouncedSearch(searchValue);
    return () => applyDebouncedSearch.clear();
  }, [searchValue, applyDebouncedSearch]);

  const handleStatusChange = (status: string | null) => {
    setStatusFilter(status);
    setPage(1); // Reset page on filter change
  };

  const { data, isLoading, error, refetch, isFetching } =
    useGetTransactionsQuery({
      page,
      limit: 10,
      search: searchTerm || undefined,
      status: statusFilter || undefined,
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rawTransactions = data?.data || [];
  const rawMeta = data?.meta;

  const transactions = useMemo(() => {
    return rawTransactions.map(mapTransaction);
  }, [rawTransactions]);

  const paginationMeta = rawMeta
    ? {
        page: rawMeta.page ?? page,
        limit: rawMeta.limit ?? 10,
        total: rawMeta.total ?? 0,
        pages: rawMeta.totalPages ?? 1,
      }
    : null;

  if (isLoading) {
    return <AdminPlansSkeleton showTransactions={true} />;
  }

  if (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="text-destructive mx-auto h-12 w-12" />
          <h2 className="mt-4 text-xl font-bold">Failed to load data</h2>
          <p className="text-muted-foreground mt-2">
            {err?.data?.message ||
              err?.message ||
              "An unexpected error occurred"}
          </p>
          <Button onClick={() => refetch()} className="mt-6">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminTransactionsHeader />

      <div className="space-y-8 px-4 py-8 pb-20 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <FinancialStatsGrid />

        {/* Filter Bar */}
        <TransactionFilterBar
          searchTerm={searchValue}
          onSearchChange={setSearchValue}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusChange}
        />

        {/* Transactions Table Wrapper */}
        <div className="space-y-4">
          {paginationMeta && (
            <div className="text-muted-foreground flex items-center justify-between px-2 text-xs font-medium">
              <p>
                {isFetching ? (
                  "Loading..."
                ) : (
                  <>
                    Showing{" "}
                    <span className="text-foreground font-bold">
                      {Math.min(
                        (paginationMeta.page - 1) * paginationMeta.limit + 1,
                        paginationMeta.total,
                      )}
                    </span>{" "}
                    –{" "}
                    <span className="text-foreground font-bold">
                      {Math.min(
                        paginationMeta.page * paginationMeta.limit,
                        paginationMeta.total,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="text-foreground font-bold">
                      {paginationMeta.total}
                    </span>{" "}
                    transactions
                  </>
                )}
              </p>
            </div>
          )}

          <TransactionTable transactions={transactions} />

          {/* Pagination */}
          {paginationMeta && paginationMeta.pages > 1 && (
            <div className="flex justify-end pt-4">
              <PaginationBar meta={paginationMeta} onPageChange={setPage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTransactionsManagementView;
