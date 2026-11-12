import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { budgetService } from "@/services/budgetService";
import { queryKeys } from "@/constants/queryKeys";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function useCreateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: budgetService.createBudget,
    onSuccess: () => {
      toast.success("Budget created.");
      queryClient.invalidateQueries({ queryKey: queryKeys.budgetsAll });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardAll });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
