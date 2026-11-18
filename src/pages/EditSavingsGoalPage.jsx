import { Link, useParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useSavingsGoal } from "@/hooks/useSavingsGoal";
import { getErrorMessage } from "@/utils/errorMessageUtil";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageHeader } from "@/components/layout/PageHeader";
import { EditGoalSection } from "@/components/savings/EditGoalSection";

export default function EditSavingsGoalPage() {
  const { id } = useParams();
  const { data: goal, isPending, isError, error } = useSavingsGoal(id);

  return (
    <div className="space-y-6">
      <Link
        to={ROUTES.savingsDetail(id)}
        className="inline-block text-sm font-semibold text-primary hover:underline"
      >
        ← Back to {goal?.name ?? "goal"}
      </Link>

      <PageHeader
        title="Manage goal"
        description="Update the details, pause it, or remove it."
      />

      {isPending && <Skeleton className="h-[460px] max-w-2xl" />}

      {isError && (
        <Card role="alert" className="text-center">
          <p className="text-ink">
            {getErrorMessage(error, "We couldn't find that goal.")}
          </p>
          <Link
            to={ROUTES.savings}
            className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Back to savings
          </Link>
        </Card>
      )}

      {goal && <EditGoalSection goal={goal} />}
    </div>
  );
}
