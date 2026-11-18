import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { savingsService } from "@/services/savingsService";
import { invalidateSavingsData } from "@/libs/queryInvalidation";
import { getErrorMessage } from "@/utils/errorMessageUtil";

export function useCreateSavingsGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savingsService.createGoal,
    onSuccess: () => {
      toast.success("Savings goal created.");
      invalidateSavingsData(queryClient);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
