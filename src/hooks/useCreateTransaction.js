import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { transactionService } from "@/services/transactionService";
import { invalidateTransactionData } from "@/libs/queryInvalidation";
import { getErrorMessage } from "@/utils/errorMessageUtil";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transactionService.createTransaction,
    onSuccess: () => {
      toast.success("Transaction added.");
      invalidateTransactionData(queryClient);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
