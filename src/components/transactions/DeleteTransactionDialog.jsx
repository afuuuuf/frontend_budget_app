import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";

// Pass the transaction to delete to open it, or null to keep it closed.
// Used by both the list and the detail page, so the delete flow lives in one place.
export function DeleteTransactionDialog({ transaction, onClose, onDeleted }) {
  const { mutate, isPending } = useDeleteTransaction();

  const handleConfirm = () =>
    mutate(transaction.id, {
      onSuccess: () => {
        onClose();
        onDeleted?.();
      },
    });

  return (
    <ConfirmDialog
      open={Boolean(transaction)}
      title="Delete this transaction?"
      description={`“${transaction?.title ?? ""}” will be removed from your history and your totals. This can't be undone.`}
      confirmLabel="Delete"
      loading={isPending}
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  );
}
