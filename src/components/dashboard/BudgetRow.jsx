import { getCategoryIcon } from "@/constants/categories";
import { formatCurrency } from "@/utils/currencyUtil";
import { getBudgetStatus } from "@/utils/mathUtil";
import { ProgressBar } from "@/components/ui/ProgressBar";

const TEXT = {
  ok: "text-slate",
  warning: "text-amber",
  over: "text-terracotta",
};
const TILE = {
  ok: "bg-primary/10 text-primary",
  warning: "bg-amber/10 text-amber",
  over: "bg-terracotta/10 text-terracotta",
};

export function BudgetRow({ budget }) {
  const { category, spent, limit } = budget;
  const { ratio, percent, remaining, status } = getBudgetStatus(budget);
  const Icon = getCategoryIcon(category);
  const money = (n) => formatCurrency(n, { decimals: "auto" });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${TILE[status]}`}
          >
            <Icon size={18} aria-hidden="true" />
          </span>
          <span className="text-[15px] font-semibold text-ink">{category}</span>
        </div>
        <p className="text-[15px]">
          <span className="font-semibold text-ink">{money(spent)}</span>
          <span className="text-slate"> / {money(limit)}</span>
        </p>
      </div>

      <div className="mt-4">
        <ProgressBar
          ratio={ratio}
          status={status}
          label={`${category} budget used`}
        />
      </div>

      <div className={`mt-3 flex justify-between text-[13px] ${TEXT[status]}`}>
        <span>
          {status === "over"
            ? `${money(Math.abs(remaining))} over budget`
            : `${money(remaining)} remaining`}
        </span>
        <span>{percent}% used</span>
      </div>
    </div>
  );
}
