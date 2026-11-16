import { useQuery } from "@tanstack/react-query";
import { transactionService } from "@/services/transactionService";
import { queryKeys } from "@/constants/queryKeys";

export function useTransaction(id) {
  return useQuery({
    queryKey: queryKeys.transaction(id),
    queryFn: () => transactionService.getTransaction(id),
  });
}
