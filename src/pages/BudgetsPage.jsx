import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { ROUTES } from "@/constants/routes";
import { useBudgets } from "@/hooks/useBudgets";
import { useSelectedMonth } from "@/hooks/useSelectedMonth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { formatMonthName } from "@/utils/timeUtil";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { MonthPicker } from "@/components/dashboard/MonthPicker";
import { BudgetSummary } from "@/components/budgets/BudgetSummary";
import { BudgetAlert } from "@/components/budgets/BudgetAlert";
import { BudgetTable } from "@/components/budgets/BudgetTable";

export default function BudgetsPage() {
  const { year, month, monthValue, setMonthValue } = useSelectedMonth();
  const { data, isPending, isError, error, refetch, isPlaceholderData } =
    useBudgets({ year, month });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[32px] font-medium leading-tight tracking-tight text-ink">
            A plan for your money
          </h1>
          <p className="mt-2 text-[15px] text-slate">
            Budgets · Give your spending a little direction.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <MonthPicker year={year} month={month} onChange={setMonthValue} />
          <Link
            to={ROUTES.budgetNew}
            className="flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            <FiPlus aria-hidden="true" size={18} />
            Create budget
          </Link>
        </div>
      </div>

      {isPending && (
        <div
          role="status"
          aria-label="Loading your budgets"
          className="space-y-6"
        >
          <Skeleton className="h-[170px]" />
          <Skeleton className="h-[360px]" />
        </div>
      )}

      {isError && !data && (
        <Card role="alert" className="text-center">
          <p className="text-ink">
            {getErrorMessage(error, "We couldn't load your budgets.")}
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

      {data && data.length === 0 && (
        <Card className="text-center">
          <h2 className="text-xl font-medium text-ink">
            No budgets for {formatMonthName(year, month)} yet
          </h2>
          <p className="mt-2 text-slate">
            Set a limit for a category to see how your spending compares.
          </p>
          <Link
            to={ROUTES.budgetNew}
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-white hover:bg-primary-dark"
          >
            <FiPlus aria-hidden="true" size={18} />
            Create budget
          </Link>
        </Card>
      )}

      {data && data.length > 0 && (
        <div
          className={`space-y-6 transition-opacity ${
            isPlaceholderData ? "opacity-60" : "opacity-100"
          }`}
        >
          <BudgetSummary budgets={data} year={year} month={month} />
          <BudgetAlert budgets={data} />
          <BudgetTable
            budgets={data}
            year={year}
            month={month}
            monthValue={monthValue}
          />
          <p className="text-xs text-slate">
            Budgets track expenses only. Moving money to savings doesn't use
            your spending plan.
          </p>
        </div>
      )}
    </div>
  );
}
