import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useDeleteSavingsGoal } from "@/hooks/useDeleteSavingsGoal";

// Pass the goal to delete to open it, or null to keep it closed.
export function DeleteGoalDialog({ goal, onClose, onDeleted }) {
  const { mutate, isPending } = useDeleteSavingsGoal();

  const handleConfirm = () =>
    mutate(goal.id, {
      onSuccess: () => {
        onClose();
        onDeleted();
      },
    });

  return (
    <ConfirmDialog
      open={Boolean(goal)}
      title="Delete this goal?"
      description={`“${goal?.name ?? ""}” and its contribution history will be removed. This can't be undone.`}
      confirmLabel="Delete goal"
      loading={isPending}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
}
