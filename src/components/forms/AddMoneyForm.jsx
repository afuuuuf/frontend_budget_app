import { FiCreditCard } from "react-icons/fi";
import { DEFAULT_CURRENCY } from "@/constants/app";
import { formatCurrency, parseMoneyInput } from "@/utils/moneyUtil";
import { formatFullDate } from "@/utils/timeUtil";
import { FormField } from "@/components/ui/FormField";
import { FormActions } from "@/components/ui/FormActions";
import { AmountInput } from "@/components/ui/AmountInput";
import { Input } from "@/components/ui/Input";
import { getGoalIcon } from "@/components/savings/goalIcons";

// `form` comes from useContributionForm(); `aside` is the preview column, already built.
export function AddMoneyForm({
  form,
  goal,
  loading = false,
  onSubmit,
  onCancel,
  aside,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const Icon = getGoalIcon(goal.icon);
  const amount = parseMoneyInput(watch("amount"));

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr]"
    >
      <section className="rounded-2xl border border-mist bg-surface p-6 sm:p-8">
        <div className="flex items-center gap-4 border-b border-mist pb-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon aria-hidden="true" size={24} />
          </span>
          <div>
            <h2 className="text-xl font-medium text-ink">{goal.name}</h2>
            <p className="mt-1 text-[13px] text-slate">
              {formatCurrency(goal.saved, { decimals: "auto" })} saved of{" "}
              {formatCurrency(goal.target, { decimals: "auto" })}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <FormField
            label="Amount to add"
            htmlFor="amount"
            error={errors.amount?.message}
            hint={`${DEFAULT_CURRENCY} · One-time contribution`}
          >
            <AmountInput
              id="amount"
              invalid={Boolean(errors.amount)}
              {...register("amount")}
            />
          </FormField>

          {/* Read-only: there is one account, and the backend dates a contribution as of today. */}
          <FormField
            label="From"
            htmlFor="from"
            hint="Moves from your everyday account."
          >
            <Input
              id="from"
              readOnly
              value="Everyday account"
              className="cursor-default"
              adornment={<FiCreditCard aria-hidden="true" size={18} />}
            />
          </FormField>

          <FormField label="Date" htmlFor="date" hint="Today">
            <Input
              id="date"
              readOnly
              value={formatFullDate(new Date())}
              className="cursor-default"
            />
          </FormField>
        </div>

        <FormActions
          submitLabel={
            amount > 0
              ? `Transfer ${formatCurrency(amount, { decimals: "auto" })} to savings`
              : "Transfer to savings"
          }
          loading={loading}
          onCancel={onCancel}
        />
      </section>

      {aside && <div className="space-y-6">{aside}</div>}
    </form>
  );
}
