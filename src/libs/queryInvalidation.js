import { queryKeys } from "@/constants/queryKeys";

// Adding or deleting a transaction changes the list, every budget's "spent" amount and
// the dashboard totals. If another screen starts depending on transactions, add it here.
export function invalidateTransactionData(queryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.transactions });
  queryClient.invalidateQueries({ queryKey: queryKeys.budgetsAll });
  queryClient.invalidateQueries({ queryKey: queryKeys.dashboardAll });
}
