import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { savingsService } from "@/services/savingsService";
import { queryKeys } from "@/constants/queryKeys";
import { getErrorMessage } from "@/utils/errorMessageUtil";

export function useDeleteSavingsGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savingsService.deleteGoal,
    onSuccess: () => {
      toast.success("Goal deleted.");
      // Not savingsAll: that would refetch the goal that was just deleted (a 404).
      queryClient.invalidateQueries({ queryKey: queryKeys.savingsGoals });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardAll });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
