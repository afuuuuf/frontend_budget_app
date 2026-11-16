import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { getCategoryIcon } from "@/constants/categories";
import { formatCurrency } from "@/utils/moneyUtil";
import { formatEnumLabel } from "@/utils/enumUtil";
import { formatMediumDate } from "@/utils/timeUtil";
import { FLOW_STYLES } from "@/components/transactions/flowStyles";

export function TransactionTableRow({ transaction, monthValue }) {
  const { id, title, category, flow, amount, createdAt } = transaction;
  const Icon = getCategoryIcon(category);
  const styles = FLOW_STYLES[flow];

  return (
    // `relative` + the link's ::after below make the whole row clickable, with one real link
    // for keyboards and screen readers.
    <tr className="relative border-t border-mist transition-colors hover:bg-ivory/60">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.tile}`}
          >
            <Icon aria-hidden="true" size={18} />
          </span>
          <Link
            to={`${ROUTES.transactionDetail(id)}?month=${monthValue}`}
            className="text-[15px] font-medium text-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            {title}
          </Link>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate">
        {formatEnumLabel(category)}
      </td>
      <td className="px-6 py-4">
        <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          {formatEnumLabel(flow)}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-slate">
        <time dateTime={createdAt}>{formatMediumDate(createdAt)}</time>
      </td>
      <td
        className={`px-6 py-4 text-right text-[15px] font-semibold ${styles.amount}`}
      >
        {formatCurrency(amount, { signed: true })}
      </td>
    </tr>
  );
}
