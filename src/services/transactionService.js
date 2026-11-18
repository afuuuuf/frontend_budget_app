import { apiClient } from "@/libs/apiClient";
import { API_PATHS } from "@/constants/api";
import { TRANSACTION_FLOW } from "@/enums";
import { formatEnumLabel } from "@/utils/enumUtil";
import { fromApiMoney, toApiMoney } from "@/utils/moneyUtil";
import { buildDetailPath } from "./commonService";

export function toTransaction(raw) {
  const amount = Math.abs(fromApiMoney(raw.amount));

  return {
    id: raw.id,
    description: raw.description,
    title: raw.description?.trim() || formatEnumLabel(raw.category),
    category: raw.category,
    flow: raw.transactionFlow,
    amount: raw.transactionFlow === TRANSACTION_FLOW.INCOME ? amount : -amount,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export const transactionService = {
  async getTransactions() {
    const { data } = await apiClient.get(API_PATHS.transactions);
    return data.map(toTransaction);
  },

  async getTransaction(id) {
    const { data } = await apiClient.get(
      buildDetailPath(API_PATHS.transactions, id),
    );
    return toTransaction(data);
  },

  async createTransaction({ description, amount, category, transactionFlow }) {
    const { data } = await apiClient.post(API_PATHS.transactions, {
      description,
      amount: toApiMoney(amount),
      category,
      transactionFlow,
    });
    return toTransaction(data);
  },

  async deleteTransaction(id) {
    await apiClient.delete(buildDetailPath(API_PATHS.transactions, id));
  },
};
