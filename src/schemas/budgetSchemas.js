import { z } from "zod";
import { BUDGET_CATEGORIES } from "@/constants/categories";
import { amountSchema } from "@/schemas/commonSchemas";

export const budgetCreateSchema = z.object({
  category: z.enum(BUDGET_CATEGORIES, {
    errorMap: () => ({ message: "Choose a category." }),
  }),
  amount: amountSchema,
});

export const budgetEditSchema = z.object({ amount: amountSchema });
