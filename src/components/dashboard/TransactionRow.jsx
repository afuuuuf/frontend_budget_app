import { formatCurrency } from "@/utils/currencyUtil";
import { formatShortDate } from "@/utils/timeUtil";

export function TransactionRow({ transaction }) {
  const { title, category, date, amount } = transaction;
  const isIncome = amount > 0;

  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-x-6 py-4 sm:grid-cols-[1fr_auto_7rem]">
      <div className="min-w-0">
        <p className="truncate text-[15px] font-medium text-ink">{title}</p>
        <p className="text-[13px] text-slate">{category}</p>
      </div>
      <time dateTime={date} className="hidden text-[13px] text-slate sm:block">
        {formatShortDate(date)}
      </time>
      <p
        className={`text-right text-[15px] font-semibold ${
          isIncome ? "text-primary" : "text-terracotta"
        }`}
      >
        {formatCurrency(amount, { signed: true })}
      </p>
    </li>
  );
}
