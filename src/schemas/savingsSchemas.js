import { z } from "zod";
import { SAVINGS_STATUS } from "@/enums";
import { GOAL_NAME_MAX_LENGTH } from "@/constants/savings";
import { amountSchema } from "@/schemas/commonSchemas";
import { isIsoDate, toIsoDate } from "@/utils/timeUtil";

const name = z
  .string()
  .trim()
  .min(1, "Give your goal a name.")
  .max(
    GOAL_NAME_MAX_LENGTH,
    `Keep it to ${GOAL_NAME_MAX_LENGTH} characters or fewer.`,
  );

const targetDate = z.string().refine(isIsoDate, "Pick a target date.");

// A new goal needs a future date. An existing goal may already be past its date, and
// should still be editable (to pause it, say), so the edit schema skips that rule.
export const goalCreateSchema = z.object({
  name,
  targetAmount: amountSchema,
  targetDate: targetDate.refine(
    (value) => value > toIsoDate(),
    "Pick a date in the future.",
  ),
});

export const goalEditSchema = z.object({
  name,
  targetAmount: amountSchema,
  targetDate,
  status: z.nativeEnum(SAVINGS_STATUS),
});

export const contributionSchema = z.object({ amount: amountSchema });
