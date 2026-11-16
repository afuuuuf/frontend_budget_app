import { formatCurrency } from "@/utils/moneyUtil";

export function TransactionListFooter({
  shown,
  total,
  periodLabel,
  savingsTransfers = 0,
}) {
  const count = shown === total ? `all ${total}` : `${shown} of ${total}`;

  return (
    <div className="flex flex-col gap-1 border-t border-mist px-6 py-4 text-[13px] text-slate sm:flex-row sm:items-center sm:justify-between">
      <p>
        Showing {count} {total === 1 ? "entry" : "entries"} · {periodLabel}
      </p>
      {savingsTransfers > 0 && (
        <p>
          {formatCurrency(savingsTransfers, { decimals: "auto" })} transferred
          to savings, excluded from expenses.
        </p>
      )}
    </div>
  );
}
