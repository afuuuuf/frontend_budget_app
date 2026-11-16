import { FiTrash2 } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { getCategoryIcon } from "@/constants/categories";
import { formatCurrency } from "@/utils/moneyUtil";
import { formatEnumLabel } from "@/utils/enumUtil";
import { formatDateTime } from "@/utils/timeUtil";
import { FLOW_STYLES } from "@/components/transactions/flowStyles";

export function TransactionDetailCard({ transaction, onDelete }) {
  const { title, category, flow, amount, createdAt, updatedAt } = transaction;
  const Icon = getCategoryIcon(category);
  const styles = FLOW_STYLES[flow];

  const details = [
    { label: "Category", value: formatEnumLabel(category) },
    { label: "Type", value: formatEnumLabel(flow) },
    { label: "Date", value: formatDateTime(createdAt) },
    { label: "Last updated", value: formatDateTime(updatedAt) },
  ];

  return (
    <Card className="max-w-2xl sm:p-8">
      <div className="flex items-center gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.tile}`}
        >
          <Icon aria-hidden="true" size={22} />
        </span>
        <h2 className="text-xl font-medium text-ink">{title}</h2>
      </div>

      <p
        className={`mt-6 text-[40px] font-medium leading-none tracking-tight ${styles.amount}`}
      >
        {formatCurrency(amount, { signed: true })}
      </p>

      <dl className="mt-8 divide-y divide-mist border-t border-mist text-sm [&>div]:flex [&>div]:justify-between [&>div]:gap-4 [&>div]:py-3">
        {details.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-slate">{label}</dt>
            <dd className="text-right font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex justify-end border-t border-mist pt-6">
        <button
          type="button"
          onClick={onDelete}
          className="flex h-12 items-center gap-2 rounded-xl border border-terracotta/40 px-5 text-sm font-medium text-terracotta transition-colors hover:bg-terracotta/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
        >
          <FiTrash2 aria-hidden="true" size={16} />
          Delete transaction
        </button>
      </div>
    </Card>
  );
}
