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
      id: "INV-2026-001",
      company: "Pathao Bangladesh",
      logo: "",
      amount: 14999.0,
      currency: "BDT",
      status: "PAID",
      date: "2026-05-26",
      plan: "Employer Professional",
      method: "Nagad (SSLCommerz)",
    },
    {
      id: "INV-2026-002",
      company: "Tanvir Hasan",
      logo: "",
      amount: 199.0,
      currency: "BDT",
      status: "PAID",
      date: "2026-05-25",
      plan: "Pro Seeker Package",
      method: "bKash (SSLCommerz)",
    },
    {
      id: "INV-2026-003",
      company: "Chaldal Ltd",
      logo: "",
      amount: 4999.0,
      currency: "BDT",
      status: "PAID",
      date: "2026-05-24",
      plan: "Employer Starter",
      method: "bKash (SSLCommerz)",
    },
    {
      id: "INV-2026-004",
      company: "Fahmida Rahman",
      logo: "",
      amount: 499.0,
      currency: "BDT",
      status: "UNPAID",
      date: "2026-05-23",
      plan: "Elite Seeker Package",
      method: "Visa Card (SSLCommerz)",
    },
    {
      id: "INV-2026-005",
      company: "Brain Station 23",
      logo: "",
      amount: 14999.0,
      currency: "BDT",
      status: "PAID",
      date: "2026-05-22",
      plan: "Employer Professional",
      method: "Mastercard (SSLCommerz)",
    },
    {
      id: "INV-2026-006",
      company: "Imran Khan",
      logo: "",
      amount: 199.0,
      currency: "BDT",
      status: "REFUNDED",
      date: "2026-05-20",
      plan: "Pro Seeker Package",
      method: "Rocket (SSLCommerz)",
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
