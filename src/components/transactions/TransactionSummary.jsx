import { StatCard } from "@/components/ui/StatCard";
import { formatCurrency } from "@/utils/moneyUtil";
import { formatPeriodRange } from "@/utils/timeUtil";
import { getTransactionTotals } from "@/utils/transactionUtil";

export function TransactionSummary({
  transactions,
  year,
  month,
  savingsTransfers = 0,
}) {
  const { income, expenses } = getTransactionTotals(transactions);
  const money = (amount, options) =>
    formatCurrency(amount, { decimals: "auto", ...options });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        compact
        label="Income"
        tone="income"
        value={money(income, { signed: true })}
        caption={formatPeriodRange(year, month)}
      />
      <StatCard
        compact
        label="Expenses"
        tone="expense"
        value={money(-expenses)}
        caption="Excludes savings transfers"
      />
      <StatCard
        compact
        label="Savings transfers"
        value={money(-savingsTransfers)}
        caption="Moved to goals · not expenses"
      />
    </div>
  );
}
