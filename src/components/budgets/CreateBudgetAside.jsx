import { FiPieChart } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/utils/currencyUtil";
import { formatEnumLabel } from "@/utils/enumUtil";
import { formatMonthName } from "@/utils/timeUtil";

// The preview column next to the create form. `values` are the live form values.
export function CreateBudgetAside({ values, budgets, year, month }) {
  const allocated = budgets.reduce((sum, b) => sum + b.limit, 0);
  const typed = Number(String(values.amount ?? "").replace(/,/g, ""));
  const added = Number.isFinite(typed) && typed > 0 ? typed : 0;
  const money = (n, options) =>
    formatCurrency(n, { decimals: "auto", ...options });

  return (
    <>
      <section className="rounded-2xl bg-primary/10 p-6">
        <FiPieChart aria-hidden="true" size={20} className="text-primary" />
        <h2 className="mt-8 text-2xl font-medium leading-snug text-ink">
          A limit, not a restriction.
        </h2>
        <p className="mt-3 text-[15px] text-slate">
          A little planning makes space for the things you care about. You can
          change your budget at any time.
        </p>
      </section>

      <Card>
        <h2 className="text-base font-medium text-ink">
          {formatMonthName(year, month)} at a glance
        </h2>
        <dl className="mt-4 divide-y divide-mist text-sm [&>div]:flex [&>div]:justify-between [&>div]:py-3">
          <div>
            <dt className="text-slate">Currently allocated</dt>
            <dd className="font-semibold text-ink">{money(allocated)}</dd>
          </div>
          <div>
            <dt className="text-slate">
              New {values.category ? formatEnumLabel(values.category) : ""}{" "}
              budget
            </dt>
            <dd className="font-semibold text-ink">
              {money(added, { signed: true })}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Plan after creation</dt>
            <dd className="font-semibold text-ink">
              {money(allocated + added)}
            </dd>
          </div>
        </dl>
      </Card>

      <p className="text-xs text-slate">
        Preview only · Your plan updates when you create the budget.
      </p>
    </>
  );
}
