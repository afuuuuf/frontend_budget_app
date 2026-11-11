import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { ACCOUNT_LABEL, DEFAULT_CURRENCY } from "@/constants/app";
import { formatCurrency } from "@/utils/currencyUtil";
import { StatCard } from "@/components/ui/StatCard";
import { SeedlingIcon } from "@/components/ui/SeedlingIcon";

function savingsRateCaption({ savingsRate, unspent }) {
  if (savingsRate === null) return "Add income to see your rate";
  if (unspent < 0) {
    return `Spending exceeded income by ${formatCurrency(-unspent, { decimals: "auto" })}`;
  }
  return `${formatCurrency(unspent, { decimals: "auto" })} of income unspent`;
}

export function StatsGrid({ data, periodLabel }) {
  const { balance, income, expenses, savingsTransfers, savingsRate } = data;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1fr]">
      <StatCard
        featured
        label="Current balance"
        icon={IoWalletOutline}
        value={formatCurrency(balance)}
        caption={
          savingsTransfers > 0
            ? `Available after ${formatCurrency(savingsTransfers, { decimals: "auto" })} moved to savings`
            : "Available to spend"
        }
        footer={`${ACCOUNT_LABEL} · ${DEFAULT_CURRENCY}`}
      />
      <StatCard
        label="Total income"
        tone="income"
        icon={FiArrowDownLeft}
        value={formatCurrency(income, { signed: true, decimals: "auto" })}
        caption={periodLabel}
      />
      <StatCard
        label="Total expenses"
        tone="expense"
        icon={FiArrowUpRight}
        value={formatCurrency(-expenses, { decimals: "auto" })}
        caption="Excludes savings transfers"
      />
      <StatCard
        label="Net savings rate"
        icon={SeedlingIcon}
        value={
          savingsRate === null
            ? "—"
            : `${savingsRate < 0 ? "−" : ""}${Math.abs(savingsRate)}%`
        }
        caption={savingsRateCaption(data)}
      />
    </div>
  );
}
