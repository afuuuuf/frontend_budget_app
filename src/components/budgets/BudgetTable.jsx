import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ROUTES } from "@/constants/routes";
import { getCategoryIcon } from "@/constants/categories";
import { formatCurrency } from "@/utils/currencyUtil";
import { formatEnumLabel } from "@/utils/enumUtil";
import { getBudgetStatus } from "@/utils/mathUtil";
import { formatShortMonthYear } from "@/utils/timeUtil";

const STATUS_TEXT = {
  ok: "text-slate",
  warning: "text-amber",
  over: "text-terracotta",
};
const TILE = {
  ok: "bg-primary/10 text-primary",
  warning: "bg-amber/10 text-amber",
  over: "bg-terracotta/10 text-terracotta",
};

const HEADERS = [
  "Category",
  "Period",
  "Spent / limit",
  "Progress",
  "Status",
  "Action",
];

export function BudgetTable({ budgets, year, month, monthValue }) {
  const money = (n) => formatCurrency(n, { decimals: "auto" });

  return (
    <section className="overflow-hidden rounded-2xl border border-mist bg-surface">
      <div className="flex items-center justify-between px-6 py-5">
        <h2 className="text-xl font-medium text-ink">Your category budgets</h2>
        <p className="text-[13px] text-slate">
          {budgets.length} {budgets.length === 1 ? "budget" : "budgets"} ·
          Monthly
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left">
          <thead className="bg-ivory text-xs text-slate">
            <tr>
              {HEADERS.map((heading, i) => (
                <th
                  key={heading}
                  scope="col"
                  className={`px-6 py-3 font-normal ${
                    i === 2 ? "text-right" : ""
                  } ${i === HEADERS.length - 1 ? "text-right" : ""}`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => {
              const { ratio, percent, remaining, status } =
                getBudgetStatus(budget);
              const Icon = getCategoryIcon(budget.category);
              const label = formatEnumLabel(budget.category);

              return (
                <tr key={budget.id} className="border-t border-mist">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${TILE[status]}`}
                      >
                        <Icon aria-hidden="true" size={18} />
                      </span>
                      <span className="text-[15px] font-medium text-ink">
                        {label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-ink">Monthly</p>
                    <p className="text-xs text-slate">
                      {formatShortMonthYear(year, month)}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <p className="text-[15px] font-semibold text-ink">
                      {money(budget.spent)}
                    </p>
                    <p className="text-xs text-slate">
                      of {money(budget.limit)}
                    </p>
                  </td>
                  <td className="w-[22%] px-6 py-5">
                    <ProgressBar
                      ratio={ratio}
                      status={status}
                      label={`${label} budget used`}
                    />
                    <p className="mt-2 text-xs text-slate">{percent}% used</p>
                  </td>
                  <td className={`px-6 py-5 text-sm ${STATUS_TEXT[status]}`}>
                    {status === "over"
                      ? `${money(Math.abs(remaining))} over budget`
                      : `${money(remaining)} remaining`}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Link
                      to={`${ROUTES.budgetEdit(budget.category)}?month=${monthValue}`}
                      aria-label={`Edit ${label} budget`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      Edit <FiEdit2 aria-hidden="true" size={14} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
