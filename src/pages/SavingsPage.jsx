import { FiPlus, FiRepeat } from "react-icons/fi";
import { ROUTES } from "@/constants/routes";
import { SAVINGS_STATUS } from "@/enums";
import { useSavingsGoals } from "@/hooks/useSavingsGoals";
import { useMonthlyContributions } from "@/hooks/useMonthlyContributions";
import { getErrorMessage } from "@/utils/errorMessageUtil";
import { getSavingsTotals } from "@/utils/savingsUtil";
import { formatMonthName, getCurrentMonth } from "@/utils/timeUtil";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageHeader } from "@/components/layout/PageHeader";
import { SavingsSummary } from "@/components/savings/SavingsSummary";
import { GoalCard } from "@/components/savings/GoalCard";

// One shared array, so useMonthlyContributions gets the same reference while goals load.
const NO_GOALS = [];

export default function SavingsPage() {
  const { year, month } = getCurrentMonth();
  const monthName = formatMonthName(year, month);

  const { data, isPending: goalsPending, isError, error, refetch } = useSavingsGoals();
  const goals = data ?? NO_GOALS;
  const monthly = useMonthlyContributions(goals, year, month);

  const isPending = goalsPending || monthly.isPending;
  const { totalSaved, combinedTarget } = getSavingsTotals(goals);
  const activeCount = goals.filter(
    (goal) => goal.status === SAVINGS_STATUS.ACTIVE,
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Room for your future"
        description="Savings · Growing, little by little."
      >
        <LinkButton to={ROUTES.savingsNew} icon={FiPlus}>
          Create savings goal
        </LinkButton>
      </PageHeader>

      {isPending && !isError && (
        <div role="status" aria-label="Loading your savings" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-[170px]" />
            <Skeleton className="h-[170px]" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
          </div>
        </div>
      )}

      {isError && (
        <Card role="alert" className="text-center">
          <p className="text-ink">
            {getErrorMessage(error, "We couldn't load your savings.")}
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

      {!isPending && !isError && goals.length === 0 && (
        <Card className="text-center">
          <h2 className="text-xl font-medium text-ink">No savings goals yet</h2>
          <p className="mt-2 text-slate">
            Start with a wish. Make it a plan.
          </p>
          <LinkButton to={ROUTES.savingsNew} icon={FiPlus} className="mt-5">
            Create savings goal
          </LinkButton>
        </Card>
      )}

      {!isPending && !isError && goals.length > 0 && (
        <>
          <SavingsSummary
            totalSaved={totalSaved}
            goalCount={goals.length}
            combinedTarget={combinedTarget}
            monthContributions={monthly.total}
            monthName={monthName}
          />

          <section aria-labelledby="goals-heading" className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 id="goals-heading" className="text-xl font-medium text-ink">
                Growing, little by little
              </h2>
              <p className="text-[13px] font-semibold text-primary">
                {activeCount} active {activeCount === 1 ? "goal" : "goals"}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  monthContribution={monthly.byGoal[goal.id]}
                  monthName={monthName}
                />
              ))}
            </div>
          </section>

          <Callout icon={FiRepeat}>
            Savings are transfers, not expenses. Your goals grow without
            counting the same money twice.
          </Callout>
        </>
      )}
    </div>
  );
}
