import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/constants/routes";
import { useGoalForm } from "@/hooks/useGoalForm";
import { useUpdateSavingsGoal } from "@/hooks/useUpdateSavingsGoal";
import { GoalEditorForm } from "@/components/forms/GoalEditorForm";
import { DeleteGoalDialog } from "@/components/savings/DeleteGoalDialog";

// Rendered once the goal has loaded, so the form can start with its values filled in.
export function EditGoalSection({ goal }) {
  const navigate = useNavigate();
  const form = useGoalForm(goal);
  const { mutate, isPending } = useUpdateSavingsGoal();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const goToGoal = () => navigate(ROUTES.savingsDetail(goal.id));

  return (
    <div className="space-y-6">
      <GoalEditorForm
        form={form}
        mode="edit"
        loading={isPending}
        onCancel={goToGoal}
        onSubmit={(values) => mutate({ goal, ...values }, { onSuccess: goToGoal })}
      />

      <Card className="max-w-2xl sm:p-8">
        <h2 className="text-xl font-medium text-ink">Delete this goal</h2>
        <p className="mt-2 text-[15px] text-slate">
          Removes the goal and its contribution history. This can’t be undone.
        </p>
        <button
          type="button"
          onClick={() => setConfirmingDelete(true)}
          className="mt-5 flex h-12 items-center gap-2 rounded-xl border border-terracotta/40 px-5 text-sm font-medium text-terracotta transition-colors hover:bg-terracotta/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
        >
          <FiTrash2 aria-hidden="true" size={16} />
          Delete goal
        </button>
      </Card>

      <DeleteGoalDialog
        goal={confirmingDelete ? goal : null}
        onClose={() => setConfirmingDelete(false)}
        onDeleted={() => navigate(ROUTES.savings, { replace: true })}
      />
    </div>
  );
}
