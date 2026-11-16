import { toApiMoney } from "@/utils/moneyUtil";

// Validated form values (amount in dollars) -> body of POST /v1/transactions.
export function buildTransactionPayload({
  description,
  amount,
  category,
  transactionFlow,
}) {
  return {
    description,
    amount: toApiMoney(amount),
    category,
    transactionFlow,
  };
}
