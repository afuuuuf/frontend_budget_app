import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { transactionService } from "@/services/transactionService";
import { invalidateTransactionData } from "@/libs/queryInvalidation";
import { getErrorMessage } from "@/utils/errorMessageUtil";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transactionService.deleteTransaction,
    onSuccess: () => {
      toast.success("Transaction deleted.");
      invalidateTransactionData(queryClient);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
