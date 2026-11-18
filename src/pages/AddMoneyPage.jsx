import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAddContribution } from "@/hooks/useAddContribution";
import { useContributionForm } from "@/hooks/useContributionForm";
import { useSavingsGoal } from "@/hooks/useSavingsGoal";
import { getErrorMessage } from "@/utils/errorMessageUtil";
import { parseMoneyInput } from "@/utils/moneyUtil";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageHeader } from "@/components/layout/PageHeader";
import { AddMoneyForm } from "@/components/forms/AddMoneyForm";
import { AddMoneyAside } from "@/components/savings/AddMoneyAside";

export default function AddMoneyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: goal, isPending, isError, error } = useSavingsGoal(id);
  const form = useContributionForm();
  const { mutate, isPending: saving } = useAddContribution();

  const goToGoal = () => navigate(ROUTES.savingsDetail(id));

  return (
    <div className="space-y-6">
      <Link
        to={ROUTES.savingsDetail(id)}
        className="inline-block text-sm font-semibold text-primary hover:underline"
      >
        ← Back to {goal?.name ?? "goal"}
      </Link>

      <PageHeader
        title="Add money"
        description="A small step toward something that matters."
      />

      {isPending && <Skeleton className="h-[560px]" />}

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

      {goal && (
        <AddMoneyForm
          form={form}
          goal={goal}
          loading={saving}
          onCancel={goToGoal}
          onSubmit={({ amount }) =>
            mutate({ goalId: goal.id, amount }, { onSuccess: goToGoal })
          }
          aside={
            <AddMoneyAside
              goal={goal}
              amount={parseMoneyInput(form.watch("amount"))}
            />
          }
        />
      )}
    </div>
  );
}
