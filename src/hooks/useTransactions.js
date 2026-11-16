import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { transactionService } from "@/services/transactionService";
import { queryKeys } from "@/constants/queryKeys";
import { getMonthTransactions } from "@/utils/transactionUtil";

export function useTransactions({ year, month }) {
  // The list endpoint has no month filter yet, so we fetch everything once and pick the
  // month here. Switching month is instant because it never refetches.
  // useCallback keeps `select` stable, so React Query only re-runs it when the data or month changes.
  const select = useCallback(
    (transactions) => getMonthTransactions(transactions, year, month),
    [year, month],
  );

  return useQuery({
    queryKey: queryKeys.transactions,
    queryFn: transactionService.getTransactions,
    select,
  });
}
