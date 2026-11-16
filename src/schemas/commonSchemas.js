import { z } from "zod";

const AMOUNT_REGEX = /^\d+(\.\d{1,2})?$/; // 250, 250.5, 250.00

// Money typed into a form: text in, a positive number (in dollars) out.
export const amountSchema = z
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
