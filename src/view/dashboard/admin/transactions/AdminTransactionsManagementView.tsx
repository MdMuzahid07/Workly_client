'use client';

import DashboardAdminTransactionsHeader from '@/components/dashboard/dashboard-nav/header/DashboardAdminTransactionsHeader';
import PaginationBar from '@/components/shared/PaginationBar';
import { Button } from '@/components/ui/button';
import {
  useLazyGetTransactionsExportQuery,
  useGetTransactionsQuery,
  useGetPaymentStatsQuery,
} from '@/redux/feature/payment/paymentApi';
import AdminPlansSkeleton from '@/skeleton/dashboard/admin/AdminPlansSkeleton';
import debounce from 'debounce';
import { AlertTriangle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { FinancialStatsGrid } from './components/FinancialStatsGrid';
import { TransactionFilterBar } from './components/TransactionFilterBar';
import {
  TransactionTable,
  type MappedTransaction,
  type RawTransaction,
} from './components/TransactionTable';

// ==================== Helpers ====================

const PLAN_LABELS: Record<string, string> = {
  emp_free: 'Employer Free',
  emp_starter: 'Employer Starter',
  emp_pro: 'Employer Professional',
  free: 'Free Plan',
  starter: 'Starter Plan',
  pro: 'Pro Seeker Package',
  enterprise: 'Enterprise Plan',
};

const formatPlanName = (planId: string) => PLAN_LABELS[planId?.toLowerCase()] || planId || 'N/A';

const DB_STATUS_TO_UI: Record<string, string> = {
  VALIDATED: 'PAID',
  PENDING: 'ABANDONED', // User started checkout but never completed payment
  PENDING_REVIEW: 'OVERDUE',
  FAILED: 'REFUNDED',
  CANCELLED: 'CANCELLED',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapTransaction = (tx: any): MappedTransaction => {
  let dateStr = 'N/A';
  if (tx.createdAt) {
    try {
      dateStr = new Date(tx.createdAt).toISOString().split('T')[0];
    } catch {
      dateStr = String(tx.createdAt).substring(0, 10);
    }
  }

  return {
    id: tx.tranId,
    company: tx.company?.name || tx.user?.fullName || 'N/A',
    logo: tx.company?.logoUrl || '',
    amount: tx.amount,
    currency: tx.currency === 'BDT' ? '৳' : tx.currency,
    status: DB_STATUS_TO_UI[tx.status] ?? tx.status,
    date: dateStr,
    plan: formatPlanName(tx.planId),
    method: `${tx.cardType || 'Online'} (SSLCommerz)`,
  };
};

/** Build CSV content from raw transactions */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildCSV = (rows: any[]): string => {
  const headers = [
    'Transaction ID',
    'Customer',
    'Email',
    'Company',
    'Plan',
    'Category',
    'Amount',
    'Currency',
    'Status',
    'Method',
    'Validation ID',
    'Bank Tran ID',
    'Date',
  ];

  const escape = (v: string | number | null | undefined) => {
    const s = v == null ? '' : String(v);
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };

  const csvRows = rows.map((tx) => {
    const uiStatus = DB_STATUS_TO_UI[tx.status] ?? tx.status;
    return [
      escape(tx.tranId),
      escape(tx.user?.fullName),
      escape(tx.user?.email),
      escape(tx.company?.name),
      escape(formatPlanName(tx.planId)),
      escape(tx.category),
      escape(tx.amount),
      escape(tx.currency),
      escape(uiStatus),
      escape(`${tx.cardType || 'Online'} (SSLCommerz)`),
      escape(tx.valId),
      escape(tx.bankTranId),
      escape(tx.createdAt ? new Date(tx.createdAt).toISOString().split('T')[0] : ''),
    ].join(',');
  });

  return [headers.join(','), ...csvRows].join('\n');
};

const downloadCSV = (filename: string, content: string) => {
  const blob = new Blob(['\uFEFF' + content], {
    type: 'text/csv;charset=utf-8',
  }); // BOM for Excel UTF-8
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// ==================== View ====================

const AdminTransactionsManagementView = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);

  // 300 ms debounce — prevents API call on every keystroke
  const applyDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setPage(1);
      }, 300),
    [],
  );

  useEffect(() => {
    applyDebouncedSearch(searchValue);
    return () => applyDebouncedSearch.clear();
  }, [searchValue, applyDebouncedSearch]);

  const handleStatusChange = (status: string | null) => {
    setStatusFilter(status);
    setPage(1);
  };

  // ==================== Paginated transaction list ====================
  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
    refetch,
    isFetching,
  } = useGetTransactionsQuery({
    page,
    limit: 10,
    search: searchTerm || undefined,
    status: statusFilter || undefined,
  });

  // ==================== Stats cards ====================
  const { data: statsData, isLoading: isStatsLoading } = useGetPaymentStatsQuery(undefined);

  // ==================== Lazy export query ====================
  const [triggerExport] = useLazyGetTransactionsExportQuery();

  // ==================== Data mapping ====================

  const rawTransactions: RawTransaction[] = useMemo(() => listData?.data || [], [listData]);

  const transactions: MappedTransaction[] = useMemo(
    () => rawTransactions.map(mapTransaction),
    [rawTransactions],
  );

  const paginationMeta = listData?.meta
    ? {
        page: listData.meta.page ?? page,
        limit: listData.meta.limit ?? 10,
        total: listData.meta.total ?? 0,
        pages: listData.meta.totalPages ?? 1,
      }
    : null;

  const statsPayload = statsData?.data;

  // ==================== Export handler ====================
  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      const res = await triggerExport({
        search: searchTerm || undefined,
        status: statusFilter || undefined,
      }).unwrap();

      const rows = res?.data || [];
      if (!rows.length) {
        toast.info('No transactions to export for the current filters.');
        return;
      }

      const dateTag = new Date().toISOString().split('T')[0];
      const statusTag = statusFilter ? `_${statusFilter.toLowerCase()}` : '';
      downloadCSV(`workly_transactions${statusTag}_${dateTag}.csv`, buildCSV(rows));
      toast.success(`Exported ${rows.length} transaction${rows.length !== 1 ? 's' : ''}.`);
    } catch {
      toast.error('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // ==================== Loading / Error states ====================
  if (isListLoading) {
    return <AdminPlansSkeleton showTransactions={true} />;
  }

  if (listError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = listError as any;
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="text-destructive mx-auto h-12 w-12" />
          <h2 className="mt-4 text-xl font-bold">Failed to load transactions</h2>
          <p className="text-muted-foreground mt-2">
            {err?.data?.message || err?.message || 'An unexpected error occurred'}
          </p>
          <Button onClick={() => refetch()} className="mt-6">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const hasActiveFilters = searchValue !== '' || statusFilter !== null;

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminTransactionsHeader onExportClick={handleExportCSV} isExporting={isExporting} />

      <div className="space-y-8 px-4 py-8 pb-20 sm:px-6 lg:px-8">
        {/* Live Stats Grid */}
        <FinancialStatsGrid
          totalRevenue={statsPayload?.totalEarnings ?? 0}
          monthlyVolume={statsPayload?.monthlyVolume ?? 0}
          pendingAmount={statsPayload?.pendingAmount ?? 0}
          pendingCount={statsPayload?.pendingCount ?? 0}
          successRate={statsPayload?.successRate ?? 100}
          isLoading={isStatsLoading}
        />

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
                  <span className="animate-pulse">Loading…</span>
                ) : (
                  <>
                    Showing{' '}
                    <span className="text-foreground font-bold">
                      {paginationMeta.total === 0
                        ? 0
                        : Math.min(
                            (paginationMeta.page - 1) * paginationMeta.limit + 1,
                            paginationMeta.total,
                          )}
                    </span>{' '}
                    –{' '}
                    <span className="text-foreground font-bold">
                      {Math.min(paginationMeta.page * paginationMeta.limit, paginationMeta.total)}
                    </span>{' '}
                    of <span className="text-foreground font-bold">{paginationMeta.total}</span>{' '}
                    transactions
                    {hasActiveFilters && (
                      <span className="text-primary ml-1 font-semibold">(filtered)</span>
                    )}
                  </>
                )}
              </p>
            </div>
          )}

          <TransactionTable transactions={transactions} rawTransactions={rawTransactions} />

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
