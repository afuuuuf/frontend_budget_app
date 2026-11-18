import { Link, useParams } from "react-router-dom";
import { FiMoreHorizontal, FiPlus, FiRepeat } from "react-icons/fi";
import { ROUTES } from "@/constants/routes";
import { useGoalContributions } from "@/hooks/useGoalContributions";
import { useSavingsGoal } from "@/hooks/useSavingsGoal";
import { getErrorMessage } from "@/utils/errorMessageUtil";
import { formatCurrency } from "@/utils/moneyUtil";
import { sumContributionsInMonth } from "@/utils/savingsUtil";
import { formatMonthName, getCurrentMonth } from "@/utils/timeUtil";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageHeader } from "@/components/layout/PageHeader";
import { GoalDetailCard } from "@/components/savings/GoalDetailCard";
import { ContributionHistory } from "@/components/savings/ContributionHistory";

export default function SavingsGoalDetailPage() {
  const { id } = useParams();
  const { year, month } = getCurrentMonth();
  const monthName = formatMonthName(year, month);

  const goalQuery = useSavingsGoal(id);
  const contributionsQuery = useGoalContributions(id);
  const goal = goalQuery.data;
  const contributions = contributionsQuery.data;

  const monthTotal = contributions
    ? sumContributionsInMonth(contributions, year, month)
    : 0;

  return (
    <div className="space-y-6">
      <Link
        to={ROUTES.savings}
        className="inline-block text-sm font-semibold text-primary hover:underline"
      >
        ← Back to savings
      </Link>

      <PageHeader
        title={goal?.name ?? "Savings goal"}
        description="One contribution at a time."
      >
        {goal && (
          <>
            <LinkButton
              to={ROUTES.savingsEdit(id)}
              icon={FiMoreHorizontal}
              variant="outline"
            >
              Manage goal
            </LinkButton>
            <LinkButton to={ROUTES.savingsAddMoney(id)} icon={FiPlus}>
              Add money
            </LinkButton>
          </>
        )}
      </PageHeader>

      {goalQuery.isPending && (
        <div role="status" aria-label="Loading your goal" className="grid gap-6 lg:grid-cols-[0.9fr_1.6fr]">
          <Skeleton className="h-[480px]" />
          <Skeleton className="h-[420px]" />
        </div>
      )}

      {goalQuery.isError && (
        <Card role="alert" className="text-center">
          <p className="text-ink">
            {getErrorMessage(goalQuery.error, "We couldn't find that goal.")}
          </p>
          <Link
            to={ROUTES.savings}
            className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Back to savings
          </Link>
        </Card>
      )}

      {goal && (
        <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.6fr]">
          <GoalDetailCard goal={goal} />

          <div className="space-y-6">
            {contributionsQuery.isPending && <Skeleton className="h-[320px]" />}
            {contributionsQuery.isError && (
              <Card role="alert" className="text-center text-ink">
                {getErrorMessage(
                  contributionsQuery.error,
                  "We couldn't load the contributions.",
                )}
              </Card>
            )}
            {contributions && (
              <>
                <ContributionHistory
                  goalId={goal.id}
                  contributions={contributions}
                  monthName={monthName}
                  monthTotal={monthTotal}
                />
                <Callout icon={FiRepeat}>
                  {monthTotal > 0
                    ? `${formatCurrency(monthTotal, { decimals: "auto" })} added in ${monthName}.`
                    : `Nothing added in ${monthName} yet.`}{" "}
                  All contributions are savings transfers, never expenses.
                </Callout>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
