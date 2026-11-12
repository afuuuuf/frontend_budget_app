import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiInfo } from "react-icons/fi";
import { DEFAULT_CURRENCY } from "@/constants/app";
import { BUDGET_CATEGORIES } from "@/constants/categories";
import { budgetCreateSchema, budgetEditSchema } from "@/schemas/budgetSchemas";
import { formatEnumLabel } from "@/utils/enumUtil";
import { formatMonthName } from "@/utils/timeUtil";
import { FormField } from "@/components/ui/FormField";
import { AmountInput } from "@/components/ui/AmountInput";
import { CategorySelect } from "@/components/ui/CategorySelect";
import { PeriodTabs } from "@/components/ui/PeriodTabs";

// One form for both screens. `mode` is "create" or "edit".
// `aside` is a function that receives the live form values and returns the right-hand column.
export function BudgetEditorForm({
  mode,
  category,
  defaultAmount = "",
  existingCategories = [],
  periodLabel,
  year,
  month,
  loading = false,
  onSubmit,
  onCancel,
  aside,
}) {
  const isCreate = mode === "create";
  const firstFree =
    BUDGET_CATEGORIES.find((c) => !existingCategories.includes(c)) ?? "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isCreate ? budgetCreateSchema : budgetEditSchema),
    defaultValues: isCreate
      ? { category: firstFree, amount: "" }
      : { amount: defaultAmount },
  });

  const values = watch();
  const selected = isCreate ? values.category : category;

  const categoryOptions = isCreate
    ? [
        ...(firstFree ? [] : [{ value: "", label: "Choose a category" }]),
        ...BUDGET_CATEGORIES.map((c) => {
          const taken = existingCategories.includes(c);
          return {
            value: c,
            label: taken
              ? `${formatEnumLabel(c)} · already budgeted`
              : formatEnumLabel(c),
            disabled: taken,
          };
        }),
      ]
    : [{ value: category, label: formatEnumLabel(category) }];

  const periodField = (
    <div>
      <p className="mb-2 text-sm font-semibold text-ink">
        Budget type / period
      </p>
      <PeriodTabs />
      <p className="mt-3 text-[13px] text-slate">{periodLabel}</p>
    </div>
  );

  const categoryField = (
    <FormField
      label="Category"
      htmlFor="category"
      error={errors.category?.message}
      hint={
        isCreate
          ? `Choose from ${BUDGET_CATEGORIES.length} expense categories. Categories are fixed.`
          : "The category can't be changed. Create a new budget for a different one."
      }
    >
      <CategorySelect
        id="category"
        options={categoryOptions}
        invalid={Boolean(errors.category)}
        disabled={!isCreate}
        {...(isCreate ? register("category") : { defaultValue: category })}
      />
    </FormField>
  );

  const amountField = (
    <FormField
      label="Amount allocated"
      htmlFor="amount"
      error={errors.amount?.message}
      hint={
        isCreate
          ? `${DEFAULT_CURRENCY} · Resets at the start of each month.`
          : `${DEFAULT_CURRENCY} · Changes apply to this month's budget.`
      }
    >
      <AmountInput
        id="amount"
        invalid={Boolean(errors.amount)}
        {...register("amount")}
      />
    </FormField>
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr]"
    >
      <section className="rounded-2xl border border-mist bg-surface p-6 sm:p-8">
        <h2 className="text-xl font-medium text-ink">Budget details</h2>

        {isCreate ? (
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              {periodField}
              {amountField}
              <p className="flex items-start gap-3 rounded-xl bg-primary/10 p-4 text-[13px] text-primary">
                <FiInfo aria-hidden="true" className="mt-0.5 shrink-0" />
                <span>
                  This budget will track{" "}
                  {selected ? formatEnumLabel(selected) : "your"} expenses in{" "}
                  {formatMonthName(year, month)}. It doesn't move money.
                </span>
              </p>
            </div>
            <div>{categoryField}</div>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {periodField}
            {categoryField}
            {amountField}
          </div>
        )}

        <div className="mt-8 flex justify-end gap-3 border-t border-mist pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="h-12 rounded-xl border border-mist bg-surface px-6 text-sm font-medium text-primary hover:bg-ivory"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 min-w-[9rem] items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
            )}
            {isCreate ? "Create budget" : "Save changes"}
          </button>
        </div>
      </section>

      {aside && <div className="space-y-6">{aside(values)}</div>}
    </form>
  );
}
