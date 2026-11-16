import { z } from "zod";
import { CATEGORY, TRANSACTION_FLOW } from "@/enums";
import { CATEGORIES_BY_FLOW } from "@/constants/categories";
import { DESCRIPTION_MAX_LENGTH } from "@/constants/transactions";
import { amountSchema } from "@/schemas/commonSchemas";

export const transactionCreateSchema = z
  .object({
    transactionFlow: z.nativeEnum(TRANSACTION_FLOW),
    category: z.nativeEnum(CATEGORY, {
      errorMap: () => ({ message: "Choose a category." }),
    }),
    amount: amountSchema,
    // Optional: an empty description is fine (the list falls back to the category name).
    description: z
      .string()
      .trim()
      .max(
        DESCRIPTION_MAX_LENGTH,
        `Keep it to ${DESCRIPTION_MAX_LENGTH} characters or fewer.`,
      ),
  })
  // A category is only valid for the type it belongs to (no "Salary" expense).
  .refine(
    ({ transactionFlow, category }) =>
      CATEGORIES_BY_FLOW[transactionFlow].includes(category),
    { path: ["category"], message: "Choose a category that fits the type." },
  );
