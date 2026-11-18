import { useQuery } from "@tanstack/react-query";
import { savingsService } from "@/services/savingsService";
import { queryKeys } from "@/constants/queryKeys";

export function useGoalContributions(goalId) {
  return useQuery({
    queryKey: queryKeys.contributions(goalId),
    queryFn: () => savingsService.getContributions(goalId),
  });
}
