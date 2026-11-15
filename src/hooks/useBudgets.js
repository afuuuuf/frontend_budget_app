import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { budgetService } from "@/services/budgetService";
import { queryKeys } from "@/constants/queryKeys";

export function useBudgets({ year, month }) {
  return useQuery({
    queryKey: queryKeys.budgets(year, month),
    queryFn: () => budgetService.getBudgets({ year, month }),
    placeholderData: keepPreviousData,
  });
}
