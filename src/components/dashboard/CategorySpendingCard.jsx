import { Card } from "@/components/ui/Card";
import { CategoryDonut } from "@/components/charts/CategoryDonut";
import { getSegmentColor } from "@/constants/categories";
import { formatCurrency } from "@/utils/currencyUtil";
import { formatMonthName } from "@/utils/timeUtil";

export function CategorySpendingCard({ items, total, year, month }) {
  const count = items.length;

  return (
    <Card>
      <h2 className="text-xl font-medium text-ink">Category spending</h2>

      <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row">
        <CategoryDonut items={items} total={total} />

        {count > 0 ? (
          <ul className="w-full space-y-4">
            {items.map((item, i) => (
              <li
                key={item.name}
                className="flex items-start justify-between gap-4"
              >
                <span className="flex items-center gap-3 text-sm text-ink">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: getSegmentColor(i) }}
                  />
                  {item.name}
                </span>
                <span className="text-right">
                  <span className="block text-sm font-semibold text-ink">
                    {formatCurrency(item.amount, { decimals: "auto" })}
                  </span>
                  <span className="block text-xs text-slate">
                    {item.share}%
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate">
            No expenses recorded for this month.
          </p>
        )}
      </div>

      {count > 0 && (
        <p className="mt-6 text-[13px] text-slate">
          {formatMonthName(year, month)} expenses · {count} spending{" "}
          {count === 1 ? "category" : "categories"}
        </p>
      )}
    </Card>
  );
}
