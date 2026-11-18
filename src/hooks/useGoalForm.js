import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SAVINGS_STATUS } from "@/enums";
import { goalCreateSchema, goalEditSchema } from "@/schemas/savingsSchemas";

// No `goal`: the create form. With a `goal`: the edit form, filled in with its values.
// The page owns the form so it can read the live values for the preview column.
export function useGoalForm(goal) {
  const isEdit = Boolean(goal);

  return useForm({
    resolver: zodResolver(isEdit ? goalEditSchema : goalCreateSchema),
    defaultValues: isEdit
      ? {
          name: goal.name,
          targetAmount: String(goal.target),
          targetDate: goal.targetDate,
          status: goal.status,
        }
      : {
          name: "",
          targetAmount: "",
          targetDate: "",
          status: SAVINGS_STATUS.ACTIVE,
        },
  });
}
