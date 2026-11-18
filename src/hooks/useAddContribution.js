import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { savingsService } from "@/services/savingsService";
import { invalidateSavingsData } from "@/libs/queryInvalidation";
import { getErrorMessage } from "@/utils/errorMessageUtil";

export function useAddContribution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savingsService.addContribution,
    onSuccess: () => {
      toast.success("Added to your savings.");
      invalidateSavingsData(queryClient);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
