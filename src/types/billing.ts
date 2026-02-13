export interface Invoice {
  id: string;
  number: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "failed" | "void";
  planName: string;
  downloadUrl: string;
}

export interface BillingSummary {
  currentPlan: string;
  nextBillingDate: string;
  amountDue: number;
  autoRenew: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "paypal";
  last4: string;
  expiry: string;
  isDefault: boolean;
}
