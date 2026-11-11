import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/hooks/useDashboard";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getFirstName } from "@/utils/userUtil";
import {
  formatPeriodRange,
  getCurrentMonth,
  parseMonthValue,
  toMonthValue,
} from "@/utils/timeUtil";
import { Card } from "@/components/ui/Card";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { BudgetOverviewCard } from "@/components/dashboard/BudgetOverviewCard";
import { CategorySpendingCard } from "@/components/dashboard/CategorySpendingCard";
import { RecentTransactionsCard } from "@/components/dashboard/RecentTransactionsCard";
import { SavingsSummaryCard } from "@/components/dashboard/SavingsSummaryCard";

export default function HomePage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // The selected month lives in the URL (?month=2026-10), so it survives a refresh and can be shared.
  const current = getCurrentMonth();
  const { year, month } = parseMonthValue(searchParams.get("month")) ?? current;
  const handleMonthChange = (value) => {
    const isCurrent = value === toMonthValue(current.year, current.month);
    setSearchParams(isCurrent ? {} : { month: value }, { replace: true });
  };

  const { data, isPending, isError, error, refetch, isPlaceholderData } =
    useDashboard({ year, month });

  const periodLabel = `${formatPeriodRange(year, month)}, ${year}`;
  const shortPeriod = formatPeriodRange(year, month);

  return (
    <div className="space-y-6">
      <DashboardHeader
        name={getFirstName(user?.email)}
        year={year}
        month={month}
        onMonthChange={handleMonthChange}
        onAddTransaction={() => toast("Adding transactions is coming next.")}
      />

      {isPending && <DashboardSkeleton />}

      {isError && !data && (
        <Card role="alert" className="text-center">
          <p className="text-ink">
            {getErrorMessage(error, "We couldn't load your dashboard.")}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-xl border border-mist px-4 py-2 text-sm font-medium text-primary hover:bg-ivory"
          >
            Try again
          </button>
        </Card>
      )}

      {data && (
        <div
          className={`space-y-6 transition-opacity ${
            isPlaceholderData ? "opacity-60" : "opacity-100"
          }`}
        >
          <StatsGrid data={data} periodLabel={periodLabel} />
          <p className="text-xs text-slate">
            {shortPeriod} · Net savings rate = (income − expenses) ÷ income.
            Savings transfers aren’t expenses. No income? Rate is —.
          </p>

          <div className="grid items-start gap-6 lg:grid-cols-2">
            <BudgetOverviewCard budgets={data.budgets} />
            <CategorySpendingCard
              items={data.categorySpending}
              total={data.totalSpent}
              year={year}
              month={month}
            />
          </div>

          {(data.recentTransactions || data.savings) && (
            <div className="grid items-start gap-6 lg:grid-cols-[2.1fr_1fr]">
              {data.recentTransactions && (
                <RecentTransactionsCard
                  transactions={data.recentTransactions}
                />
              )}
              {data.savings && (
                <SavingsSummaryCard
                  savings={data.savings}
                  year={year}
                  month={month}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
