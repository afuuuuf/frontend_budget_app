import { FiInfo } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getCategoryIcon } from "@/constants/categories";
import { formatCurrency } from "@/utils/currencyUtil";
import { formatEnumLabel } from "@/utils/enumUtil";
import { getBudgetStatus } from "@/utils/mathUtil";
import { formatMonthYear } from "@/utils/timeUtil";

const PILL = {
  ok: "bg-primary/10 text-primary",
  warning: "bg-amber/10 text-amber",
  over: "bg-terracotta/10 text-terracotta",
};
const TEXT = {
  ok: "text-primary",
  warning: "text-amber",
  over: "text-terracotta",
};

// Shows where the budget stands today, next to the edit form.
export function EditBudgetAside({ budget, year, month }) {
  const { ratio, percent, remaining, status } = getBudgetStatus(budget);
  const Icon = getCategoryIcon(budget.category);
  const money = (n) => formatCurrency(n, { decimals: "auto" });

  return (
    <>
      <Card>
        <div className="flex items-center gap-3">
          <Icon aria-hidden="true" size={20} className="text-primary" />
          <h2 className="text-xl font-medium text-ink">
            {formatEnumLabel(budget.category)}
          </h2>
        </div>

        <p
          className={`mt-4 w-fit rounded-full px-3 py-1 text-xs font-medium ${PILL[status]}`}
        >
          {status === "over"
            ? `${money(Math.abs(remaining))} over budget`
            : `${money(remaining)} remaining`}
        </p>

        <p className="mt-5 text-[32px] font-medium leading-tight tracking-tight text-ink">
          {money(budget.spent)} spent
        </p>
        <p className="mt-3 text-[13px] text-slate">
          of {money(budget.limit)} allocated · {formatMonthYear(year, month)}
        </p>

        <div className="mt-5">
          <ProgressBar
            ratio={ratio}
            status={status}
            label={`${formatEnumLabel(budget.category)} budget used`}
          />
        </div>
        <p className={`mt-3 text-[13px] ${TEXT[status]}`}>
          {percent}% of this month's budget used
        </p>
      </Card>

      <p className="flex items-start gap-3 rounded-xl bg-primary/10 p-4 text-[13px] text-primary">
        <FiInfo aria-hidden="true" className="mt-0.5 shrink-0" />
        <span>
          Your recorded expenses stay the same when you update a budget.
        </span>
      </p>
    </>
  );
}
