"use client";

import DashboardAdminTransactionsHeader from "@/components/dashboard/dashboard-nav/header/DashboardAdminTransactionsHeader";
import { useState } from "react";
import { FinancialStatsGrid } from "./components/FinancialStatsGrid";
import { TransactionFilterBar } from "./components/TransactionFilterBar";
import { TransactionTable } from "./components/TransactionTable";

const AdminTransactionsManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Mock data for transactions (invoices)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [transactions, setTransactions] = useState([
    {
      id: "INV-2024-001",
      company: "TechFlow Systems",
      logo: "",
      amount: 499.0,
      currency: "USD",
      status: "PAID",
      date: "2024-03-01",
      plan: "Pro Enterprise",
      method: "Visa •••• 4242",
    },
    {
      id: "INV-2024-002",
      company: "CreativeCloud",
      logo: "",
      amount: 199.0,
      currency: "USD",
      status: "PAID",
      date: "2024-03-01",
      plan: "Standard Business",
      method: "Mastercard •••• 8888",
    },
    {
      id: "INV-2024-003",
      company: "GrowthX",
      logo: "",
      amount: 899.0,
      currency: "USD",
      status: "UNPAID",
      date: "2024-02-28",
      plan: "Scale Platform",
      method: "Bank Transfer",
    },
    {
      id: "INV-2024-004",
      company: "SecureSolutions",
      logo: "",
      amount: 499.0,
      currency: "USD",
      status: "OVERDUE",
      date: "2024-02-15",
      plan: "Pro Enterprise",
      method: "Visa •••• 1234",
    },
    {
      id: "INV-2024-005",
      company: "GlobalNet",
      logo: "",
      amount: 1200.0,
      currency: "USD",
      status: "REFUNDED",
      date: "2024-02-10",
      plan: "Custom Enterprise",
      method: "Visa •••• 5555",
    },
    {
      id: "INV-2024-006",
      company: "BlueRocket",
      logo: "",
      amount: 299.0,
      currency: "USD",
      status: "PAID",
      date: "2024-03-02",
      plan: "Startup Growth",
      method: "Stripe",
    },
  ]);

  const filteredTransactions = transactions.filter(
    (tx) =>
      (tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!statusFilter || tx.status === statusFilter),
  );

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <DashboardAdminTransactionsHeader />

      <div className="space-y-8 px-4 py-8 pb-20 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <FinancialStatsGrid />

        {/* Filter Bar */}
        <TransactionFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {/* Transactions Table */}
        <TransactionTable transactions={filteredTransactions} />
      </div>
    </div>
  );
};

export default AdminTransactionsManagementView;
