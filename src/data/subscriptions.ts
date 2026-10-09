export const subscriptionColumns = [
    { id: "user", label: "User", isVisible: true, key: "user.name" },
    { id: "user_email", label: "Email", isVisible: true, key: "user.email" },
    { id: "plan", label: "Plan", isVisible: true, key: "plan.name" },
    { id: "amount", label: "Amount", isVisible: true, key: "amount_paid" },
    { id: "method", label: "Method", isVisible: true, key: "payment_gateway" },
    { id: "transaction_id", label: "Transaction ID", isVisible: false, key: "transaction_id" },
    { id: "dates", label: "Dates", isVisible: true, key: "current_period_end" },
    { id: "status", label: "Status", isVisible: true, key: "status" },
  ]

  export const colorMap: Record<string, string> = {
    blue: "bg-blue-100/50 dark:bg-blue-900/20",
    purple: "bg-purple-100/50 dark:bg-purple-900/20",
    emerald: "bg-primary/20/50 dark:bg-primary-dark/20",
    rose: "bg-rose-100/50 dark:bg-rose-900/20",
    amber: "bg-amber-100/50 dark:bg-amber-900/20",
  };