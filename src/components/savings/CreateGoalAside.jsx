import { FiInfo } from "react-icons/fi";
import { Callout } from "@/components/ui/Callout";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { inferGoalIconKey } from "@/constants/goalIcons";
import { formatCurrency, parseMoneyInput } from "@/utils/moneyUtil";
import { formatFullDate, isIsoDate } from "@/utils/timeUtil";
import { getGoalIcon } from "@/components/savings/goalIcons";

const money = (amount, options) =>
  formatCurrency(amount, { decimals: "auto", ...options });

// The preview column next to the create form. `values` are the live form values.
export function CreateGoalAside({ values }) {
  const name = values.name.trim();
  const target = parseMoneyInput(values.targetAmount);
  const Icon = getGoalIcon(inferGoalIconKey(name));

  return (
    <>
      <section className="rounded-2xl bg-primary/10 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Your goal preview
        </p>
        <div className="mt-4 flex items-center gap-3">
          <Icon aria-hidden="true" size={26} className="shrink-0 text-primary" />
          <h2 className="text-2xl font-medium text-ink">{name || "Your goal"}</h2>
        </div>

        <p className="mt-6 text-[32px] font-medium leading-none tracking-tight text-ink">
          {formatCurrency(0)}
        </p>
        <p className="mt-3 text-[15px] text-slate">
          of {formatCurrency(target)} target
        </p>

        <div className="mt-5">
          <ProgressBar ratio={0} label="Goal progress preview" />
        </div>
        <div className="mt-3 flex justify-between text-[13px]">
          <span className="font-semibold text-primary">0% saved</span>
          <span className="text-slate">{money(target)} to go</span>
        </div>

        {isIsoDate(values.targetDate) && (
          <p className="mt-5 border-t border-primary/15 pt-5 text-sm text-ink">
            Target · {formatFullDate(values.targetDate)}
          </p>
        )}
      </section>

      <Callout icon={FiInfo}>
        Your goal starts at {money(0)}. Add money whenever you’re ready, with no
        change to your expense totals.
      </Callout>
    </>
  );
}
