import { FiPieChart } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCurrency } from "@/utils/currencyUtil";
import { getBudgetStatus } from "@/utils/mathUtil";
import { formatMonthName, formatMonthRange } from "@/utils/timeUtil";

export function BudgetSummary({ budgets, year, month }) {
  const allocated = budgets.reduce((sum, b) => sum + b.limit, 0);
  const spent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = allocated - spent;
  const { ratio, percent } = getBudgetStatus({ spent, limit: allocated });
  const money = (n) => formatCurrency(n, { decimals: "auto" });

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr]">
      <section className="rounded-2xl bg-primary/10 p-6">
        <div className="flex items-start justify-between">
          <p className="text-sm text-primary">
            {formatMonthName(year, month)} spending plan
          </p>
          <p className="text-xs font-medium text-primary">{percent}% used</p>
        </div>
        <p className="mt-6 text-[40px] font-medium leading-none tracking-tight text-ink">
          {money(spent)}
          <span className="ml-3 text-sm font-normal tracking-normal text-slate">
            of {money(allocated)} allocated
          </span>
        </p>
        <div className="mt-8">
          <ProgressBar
            ratio={ratio}
            status={ratio > 1 ? "over" : "ok"}
            label="Share of your spending plan used"
          />
        </div>
      </section>

      <Card>
        <div className="flex items-start justify-between">
          <p className="text-sm text-slate">Remaining overall</p>
          <IoWalletOutline aria-hidden="true" className="text-primary" />
        </div>
        <p
          className={`mt-4 text-[32px] font-medium leading-tight tracking-tight ${
            remaining < 0 ? "text-terracotta" : "text-ink"
          }`}
        >
          {money(remaining)}
        </p>
        <p className="mt-3 text-[13px] text-slate">
          {remaining < 0
            ? "Spending is above your plan"
            : "Room across your spending categories"}
        </p>
      </Card>

      <Card>
        <div className="flex items-start justify-between">
          <p className="text-sm text-slate">Active budgets</p>
          <FiPieChart aria-hidden="true" className="text-primary" />
        </div>
        <p className="mt-4 text-[32px] font-medium leading-tight tracking-tight text-ink">
          {budgets.length}
        </p>
        <p className="mt-3 text-[13px] text-slate">
          Monthly · {formatMonthRange(year, month)}
        </p>
      </Card>
    </div>
  );
}
