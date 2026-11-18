import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useCreateSavingsGoal } from "@/hooks/useCreateSavingsGoal";
import { useGoalForm } from "@/hooks/useGoalForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { GoalEditorForm } from "@/components/forms/GoalEditorForm";
import { CreateGoalAside } from "@/components/savings/CreateGoalAside";

export default function CreateSavingsGoalPage() {
  const navigate = useNavigate();
  const form = useGoalForm();
  const { mutate, isPending } = useCreateSavingsGoal();

  const goBack = () => navigate(ROUTES.savings);

  return (
    <div className="space-y-6">
      <Link
        to={ROUTES.savings}
        className="inline-block text-sm font-semibold text-primary hover:underline"
      >
        ← Back to savings
      </Link>

      <PageHeader
        title="Create savings goal"
        description="Something to grow toward. Start with a wish. Make it a plan."
      />

      <GoalEditorForm
        form={form}
        mode="create"
        loading={isPending}
        onCancel={goBack}
        onSubmit={(values) => mutate(values, { onSuccess: goBack })}
        aside={<CreateGoalAside values={form.watch()} />}
      />
    </div>
  );
}
