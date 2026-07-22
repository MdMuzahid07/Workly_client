# Client-Side Secure Payment Redirection & Invoicing Documentation

This guide describes how the checkout interface, transaction logging, printable invoices, and post-payment feedbacks are wired inside the WorklyJob React SPA (Next.js client).

---

## 1. Redux Toolkit Query API Integration

A dedicated endpoint suite is injected dynamically into the RTK Query `baseApi` structure to manage payment communication securely:

*   **File location**: `src/redux/feature/payment/paymentApi.ts`
*   **Tag Type Registered**: `payments` (configured inside `src/redux/api/baseApi.ts`)

### API Query/Mutation Hooks

1.  **`useInitiatePaymentMutation()`**
    *   **Action**: POST `/payments/initiate`
    *   **Invalidates**: `["payments"]` tag.
    *   **Purpose**: Posts checkout amount, category (`EMPLOYER_PLAN` | `SEEKER_PREMIUM`), plans slug, and user information to initialize the gateway redirect.

2.  **`useGetTransactionsQuery({ page, limit })`**
    *   **Action**: GET `/payments/transactions`
    *   **Provides**: `["payments"]` tag.
    *   **Purpose**: Fetches the paginated history of all purchases belonging to the logged-in user (or full stats if admin).

3.  **`useGetPaymentStatsQuery()`**
    *   **Action**: GET `/payments/stats`
    *   **Provides**: `["payments"]` tag.
    *   **Purpose**: Admin billing metrics dashboard.

---

## 2. Dynamic Checkout Card Component

*   **File Path**: `src/components/dashboard/pricing/PricingTierCard.tsx`

The upgrade/checkout CTA buttons inside the pricing tables are dynamically connected to SSLCommerz.

### Key Logic
*   **Login Check**: Redirects unauthenticated users to `/auth/login`.
*   **Custom Actions**: Opens default email queries if they trigger contact on Enterprise / custom plans.
*   **Pricing Conversion**: Formats string pricing schemas (e.g. `৳4,999` BDT) into raw float numbers (e.g. `4999`) automatically for the API payload.
*   **Active Subscription Lock**: If the card represents the user's currently active subscription (`isActivePlan === true`), the checkout button is disabled and its label is locked to `"Current Plan"` to prevent double purchasing.
*   **Dynamic Discount Promotion**: Renders an absolute promotional banner (e.g. `"35% OFF · 1ST PURCHASE"`) at the top of the card and a strikethrough original price if `originalPrice` and `discountBadge` parameters are provided.
*   **Redirection**: Once the API slice succeeds, it triggers secure redirection by updating `window.location.href` to the sandbox or live gateway url:
    ```typescript
    const res = await initiatePayment({
      planId: id,
      category, // Passed down from Seeker/Employer Pricing views
      amount: numericAmount,
      currency: "BDT",
      cusName: user.fullName,
      cusEmail: user.email
    }).unwrap();

    if (res?.data?.gatewayUrl) {
      window.location.href = res.data.gatewayUrl;
    }
    ```

---

## 3. Dedicated Redirection Landing Pages

Three unified post-transaction routing views receive raw callback parameters securely and render premium animations, invoice summaries, and recovery options:

1.  **Payment Success Page** (`src/app/(dashboard)/payment/success/page.tsx`)
    *   **Displays**: Check icon, printable receipt details, transaction ID, and final paid amount.
    *   **Features**: Printable invoice receipt button, dynamic countdown timer that automatically navigates back to `/dashboard` after 8 seconds.

2.  **Payment Failure Page** (`src/app/(dashboard)/payment/fail/page.tsx`)
    *   **Displays**: Error icon, failed transaction ID, and the explicit failure message passed by the server.
    *   **Features**: Synchronous retry buttons to resume checkout and return-to-dashboard routes.

3.  **Payment Cancel Page** (`src/app/(dashboard)/payment/cancel/page.tsx`)
    *   **Displays**: Cancellation notification.
    *   **Features**: Resume shopping or checkout operations easily.

---

## 4. Reusable Printable Invoicing Ledger

*   **File Path**: `src/components/dashboard/billing/BillingHistoryTable.tsx`

Displays all transaction history logs dynamically, including printable receipts.

### Key Features
*   **Paginated Table**: Renders chronological ledgers (Transaction ID, dates, plans, BDT amounts, payment card types, and statuses).
*   **Badge Styling**: Standardized visual indicators:
    *   `VALIDATED` (Green)
    *   `PENDING`, `PENDING_REVIEW` (Yellow/Orange)
    *   `FAILED`, `CANCELLED` (Red)
*   **Receipt Printer**: Clicking "View Receipt" displays an elegant overlay with merchant metadata. Clicking "Print Receipt" extracts the DOM target elements and triggers native browser printing (`window.print()`).

---

## 5. Dashboard Page Registries

*   **Seeker Billing Details**: `src/app/(dashboard)/dashboard/billing-details/page.tsx`
*   **Employer Billing Details**: `src/app/(dashboard)/employer/billing-details/page.tsx`
*   **Employer Billing Overview**: Integrated the reusable ledger directly inside `src/view/dashboard/EmployerBillingView.tsx`.
*   **Seeker Pricing Panel**: `src/view/dashboard/job-seeker/pricing/JobSeekerPricingView.tsx` (fetches, parses, and formats Job Seeker tiers dynamically).
*   **Employer Pricing Panel**: `src/view/dashboard/employer/pricing/EmployerPricingView.tsx` (fetches, parses, and formats Employer tiers dynamically).
