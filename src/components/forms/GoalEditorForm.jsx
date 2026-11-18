import { DEFAULT_CURRENCY } from "@/constants/app";
import { inferGoalIconKey } from "@/constants/goalIcons";
import { GOAL_NAME_MAX_LENGTH, STATUS_OPTIONS } from "@/constants/savings";
import { addDays, toIsoDate } from "@/utils/timeUtil";
import { FormField } from "@/components/ui/FormField";
import { FormActions } from "@/components/ui/FormActions";
import { AmountInput } from "@/components/ui/AmountInput";
import { CategorySelect } from "@/components/ui/CategorySelect";
import { Input } from "@/components/ui/Input";
import { getGoalIcon } from "@/components/savings/goalIcons";

const TOMORROW = () => toIsoDate(addDays(new Date(), 1));

// Used for both creating and editing a goal. Only edit has a Status field, and only create
// has a preview column (`aside`). `form` comes from useGoalForm().
export function GoalEditorForm({
  form,
  mode = "create",
  loading = false,
  onSubmit,
  onCancel,
  aside,
}) {
  const isEdit = mode === "edit";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  // The icon in the name field follows the words in the name, as in the design.
  const NameIcon = getGoalIcon(inferGoalIconKey(watch("name")));

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={
        aside ? "grid items-start gap-6 lg:grid-cols-[1.7fr_1fr]" : "max-w-2xl"
      }
    >
      <section className="rounded-2xl border border-mist bg-surface p-6 sm:p-8">
        <h2 className="text-xl font-medium text-ink">Goal details</h2>

        <div className="mt-6 space-y-6">
          <FormField
            label="Goal name"
            htmlFor="name"
            error={errors.name?.message}
          >
            <Input
              id="name"
              maxLength={GOAL_NAME_MAX_LENGTH}
              placeholder="Home deposit"
              autoComplete="off"
              invalid={Boolean(errors.name)}
              adornment={<NameIcon aria-hidden="true" size={20} />}
              {...register("name")}
            />
          </FormField>

          <FormField
            label="Target amount"
            htmlFor="targetAmount"
            error={errors.targetAmount?.message}
            hint={`${DEFAULT_CURRENCY} · How much would you like to save?`}
          >
            <AmountInput
              id="targetAmount"
              invalid={Boolean(errors.targetAmount)}
              {...register("targetAmount")}
            />
          </FormField>

          <FormField
            label="Target date"
            htmlFor="targetDate"
            error={errors.targetDate?.message}
            hint="When would you like to reach it?"
          >
            <Input
              id="targetDate"
              type="date"
              min={isEdit ? undefined : TOMORROW()}
              invalid={Boolean(errors.targetDate)}
              {...register("targetDate")}
            />
          </FormField>

          {isEdit && (
            <FormField
              label="Status"
              htmlFor="status"
              error={errors.status?.message}
              hint="An on-hold goal stays in your list but isn’t counted as active."
            >
              <CategorySelect
                id="status"
                options={STATUS_OPTIONS}
                invalid={Boolean(errors.status)}
                {...register("status")}
              />
            </FormField>
          )}
        </div>

        <FormActions
          submitLabel={isEdit ? "Save changes" : "Create goal"}
          loading={loading}
          onCancel={onCancel}
        />
      </section>

      {aside && <div className="space-y-6">{aside}</div>}
    </form>
  );
}
