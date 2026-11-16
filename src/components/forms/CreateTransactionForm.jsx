import { Controller } from "react-hook-form";
import { DEFAULT_CURRENCY } from "@/constants/app";
import { CATEGORIES_BY_FLOW } from "@/constants/categories";
import { DESCRIPTION_MAX_LENGTH, FLOW_OPTIONS } from "@/constants/transactions";
import { TRANSACTION_FLOW } from "@/enums";
import { formatEnumLabel } from "@/utils/enumUtil";
import { formatFullDate } from "@/utils/timeUtil";
import { FormField } from "@/components/ui/FormField";
import { FormActions } from "@/components/ui/FormActions";
import { AmountInput } from "@/components/ui/AmountInput";
import { CategorySelect } from "@/components/ui/CategorySelect";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

const COPY = {
  [TRANSACTION_FLOW.EXPENSE]: {
    submit: "Add expense",
    amountHint: "Expense from your everyday account",
    categoryHint: (count) => `${count} fixed expense categories`,
  },
  [TRANSACTION_FLOW.INCOME]: {
    submit: "Add income",
    amountHint: "Income to your everyday account",
    categoryHint: (count) =>
      `Only the ${count} fixed income categories are shown.`,
  },
};

const toOptions = (categories) =>
  categories.map((value) => ({ value, label: formatEnumLabel(value) }));

export function CreateTransactionForm({
  form,
  loading = false,
  onSubmit,
  onCancel,
  aside,
}) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const flow = watch("transactionFlow");
  const categories = CATEGORIES_BY_FLOW[flow];
  const copy = COPY[flow];

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr]"
    >
      <section className="rounded-2xl border border-mist bg-surface p-6 sm:p-8">
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">
              Transaction type
            </p>
            <Controller
              name="transactionFlow"
              control={control}
              render={({ field }) => (
                <SegmentedControl
                  label="Transaction type"
                  options={FLOW_OPTIONS}
                  value={field.value}
                  onChange={(nextFlow) => {
                    field.onChange(nextFlow);
                    // Categories belong to a type, so start over from that type's first one.
                    setValue("category", CATEGORIES_BY_FLOW[nextFlow][0]);
                  }}
                />
              )}
            />
          </div>

          <FormField
            label="Amount"
            htmlFor="amount"
            error={errors.amount?.message}
            hint={`${DEFAULT_CURRENCY} · ${copy.amountHint}`}
          >
            <AmountInput
              id="amount"
              invalid={Boolean(errors.amount)}
              {...register("amount")}
            />
          </FormField>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label="Category"
              htmlFor="category"
              error={errors.category?.message}
              hint={copy.categoryHint(categories.length)}
            >
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <CategorySelect
                    {...field}
                    id="category"
                    options={toOptions(categories)}
                    invalid={Boolean(errors.category)}
                  />
                )}
              />
            </FormField>

            {/* Read-only: the backend stamps each transaction with the time it is created. */}
            <FormField label="Date" htmlFor="date" hint="Today">
              <Input
                id="date"
                readOnly
                value={formatFullDate(new Date())}
                className="cursor-default"
              />
            </FormField>
          </div>

          <FormField
            label="Description (optional)"
            htmlFor="description"
            error={errors.description?.message}
            hint="A short note to remember this by."
          >
            <TextArea
              id="description"
              maxLength={DESCRIPTION_MAX_LENGTH}
              placeholder="Weekly top-up"
              invalid={Boolean(errors.description)}
              {...register("description")}
            />
          </FormField>
        </div>

        <FormActions
          submitLabel={copy.submit}
          loading={loading}
          onCancel={onCancel}
        />
      </section>

      {aside && <div className="space-y-6">{aside}</div>}
    </form>
  );
}
