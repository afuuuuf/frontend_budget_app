import { useQuery } from "@tanstack/react-query";
import { savingsService } from "@/services/savingsService";
import { queryKeys } from "@/constants/queryKeys";

export function useSavingsGoals() {
  return useQuery({
    queryKey: queryKeys.savingsGoals,
    queryFn: savingsService.getGoals,
  });
}
