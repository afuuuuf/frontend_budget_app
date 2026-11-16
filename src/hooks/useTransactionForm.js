import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CATEGORIES_BY_FLOW } from "@/constants/categories";
import { TRANSACTION_FLOW } from "@/enums";
import { transactionCreateSchema } from "@/schemas/transactionSchemas";

const DEFAULT_FLOW = TRANSACTION_FLOW.EXPENSE;

// The create form's state lives in the page (not the form component) because the page also
// needs the live values: the subtitle and the preview column both follow the chosen type.
export function useTransactionForm() {
  return useForm({
    resolver: zodResolver(transactionCreateSchema),
    defaultValues: {
      transactionFlow: DEFAULT_FLOW,
      category: CATEGORIES_BY_FLOW[DEFAULT_FLOW][0],
      amount: "",
      description: "",
    },
  });
}
