import { FiRepeat } from "react-icons/fi";
import { Callout } from "@/components/ui/Callout";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCurrency } from "@/utils/moneyUtil";
import { getProgress } from "@/utils/savingsUtil";

const money = (amount, options) =>
  formatCurrency(amount, { decimals: "auto", ...options });

// What the goal will look like once the typed amount is added. `amount` is 0 until it's valid.
export function AddMoneyAside({ goal, amount }) {
  const savedAfter = goal.saved + amount;
  const { ratio, remaining } = getProgress(savedAfter, goal.target);

  return (
    <>
      <section className="rounded-2xl bg-primary/10 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          After this transfer
        </p>
        <h2 className="mt-4 text-[15px] text-ink">{goal.name}</h2>
        <p className="mt-3 text-[40px] font-medium leading-none tracking-tight text-ink">
          {formatCurrency(savedAfter)}
        </p>
        <p className="mt-3 text-[13px] text-slate">
          of {money(goal.target)} target ·{" "}
          {remaining > 0 ? `${money(remaining)} to go` : "goal reached"}
        </p>
        <div className="mt-4">
          <ProgressBar ratio={ratio} label={`${goal.name} progress after this transfer`} />
        </div>
      </section>

      <Callout icon={FiRepeat}>
        This is a transfer into savings, not an expense. Your spending and net
        savings rate won’t change.
      </Callout>
      <p className="text-[13px] text-slate">
        Preview only · Money moves when you confirm.
      </p>
    </>
  );
}
