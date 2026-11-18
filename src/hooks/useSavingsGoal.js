import { useQuery } from "@tanstack/react-query";
import { savingsService } from "@/services/savingsService";
import { queryKeys } from "@/constants/queryKeys";

export function useSavingsGoal(id) {
  return useQuery({
    queryKey: queryKeys.savingsGoal(id),
    queryFn: () => savingsService.getGoal(id),
  });
}
