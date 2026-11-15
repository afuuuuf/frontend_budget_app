import { z } from "zod";
import { BUDGET_CATEGORIES } from "@/constants/categories";

const AMOUNT_REGEX = /^\d+(\.\d{1,2})?$/; // 250, 250.5, 250.00

const amount = z
  .string()
  .trim()
  .min(1, "Enter an amount.")
  .transform((value) => value.replace(/,/g, ""))
  .refine(
    (value) => AMOUNT_REGEX.test(value),
    "Enter a valid amount, like 250 or 250.00.",
  )
  .transform(Number)
  .refine((value) => value > 0, "Amount must be greater than 0.");

export const budgetCreateSchema = z.object({
  category: z.enum(BUDGET_CATEGORIES, {
    errorMap: () => ({ message: "Choose a category." }),
  }),
  amount,
});

export const budgetEditSchema = z.object({ amount });
