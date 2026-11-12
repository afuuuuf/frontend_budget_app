import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { budgetService } from "@/services/budgetService";
import { queryKeys } from "@/constants/queryKeys";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: budgetService.updateBudget,
    onSuccess: () => {
      toast.success("Budget updated.");
      queryClient.invalidateQueries({ queryKey: queryKeys.budgetsAll });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardAll });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
