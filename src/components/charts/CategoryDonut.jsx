import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { getSegmentColor } from "@/constants/categories";
import { formatCurrency } from "@/utils/currencyUtil";

const EMPTY_RING = [{ name: "No spending", amount: 1, color: "#DCE5DF" }];

// items: [{ name, amount }]
export function CategoryDonut({ items, total }) {
  const data = items.length
    ? items.map((item, i) => ({ ...item, color: getSegmentColor(i) }))
    : EMPTY_RING;

  return (
    <div
      role="img"
      aria-label={`Spending by category, ${formatCurrency(total, { decimals: "auto" })} in total`}
      className="relative h-[168px] w-[168px] shrink-0"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            innerRadius="80%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            stroke="#FFFFFF"
            strokeWidth={2}
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs text-slate">Total spent</span>
        <span className="text-xl font-medium text-ink">
          {formatCurrency(total, { decimals: "auto" })}
        </span>
      </div>
    </div>
  );
}
