import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { savingsService } from "@/services/savingsService";

export function useSavings() {
  return useQuery({
    queryKey: queryKeys.savings,
    queryFn: savingsService.getSavings,
  });
}
