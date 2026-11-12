import { FiAlertCircle } from "react-icons/fi";
import { formatCurrency } from "@/utils/currencyUtil";
import { formatEnumLabel } from "@/utils/enumUtil";

export function BudgetAlert({ budgets }) {
  const over = budgets.filter((b) => b.spent > b.limit);
  if (over.length === 0) return null;

  const message =
    over.length === 1
      ? `${formatEnumLabel(over[0].category)} is ${formatCurrency(
          over[0].spent - over[0].limit,
          { decimals: "auto" },
        )} over budget.${
          budgets.length > 1 ? " Your other categories still have room." : ""
        }`
      : `${over.length} budgets are over their limit: ${over
          .map((b) => formatEnumLabel(b.category))
          .join(", ")}.`;

  return (
    <p
      role="status"
      className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary"
    >
      <FiAlertCircle aria-hidden="true" className="shrink-0" />
      {message}
    </p>
  );
}
