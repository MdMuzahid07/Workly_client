import { BillingSummary, Invoice, PaymentMethod } from "../types/billing";

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv_1",
    number: "INV-2026-001",
    amount: 49.0,
    date: "2026-02-15",
    status: "paid",
    planName: "Professional Plan",
    downloadUrl: "#",
  },
  {
    id: "inv_2",
    number: "INV-2026-002",
    amount: 49.0,
    date: "2026-01-15",
    status: "paid",
    planName: "Professional Plan",
    downloadUrl: "#",
  },
  {
    id: "inv_3",
    number: "INV-2025-012",
    amount: 19.0,
    date: "2025-12-15",
    status: "paid",
    planName: "Starter Plan",
    downloadUrl: "#",
  },
];

export const MOCK_BILLING_SUMMARY: BillingSummary = {
  currentPlan: "Professional Plan",
  nextBillingDate: "Feb 15, 2026",
  amountDue: 49.0,
  autoRenew: true,
};

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "visa",
    last4: "4242",
    expiry: "12/26",
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "mastercard",
    last4: "8888",
    expiry: "09/25",
    isDefault: false,
  },
];
