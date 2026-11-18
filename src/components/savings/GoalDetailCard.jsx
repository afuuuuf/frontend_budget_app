import { FiCalendar } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { formatCurrency } from "@/utils/moneyUtil";
import { formatFullDate } from "@/utils/timeUtil";
import { getGoalIcon } from "@/components/savings/goalIcons";

const money = (amount) => formatCurrency(amount);

export function GoalDetailCard({ goal }) {
  const Icon = getGoalIcon(goal.icon);

  return (
    <Card className="flex flex-col items-center text-center sm:p-8">
      <ProgressRing
        ratio={goal.ratio}
        label={`${goal.percent}% of ${goal.name} saved`}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon aria-hidden="true" size={26} />
        </span>
        <span className="mt-2 text-sm font-semibold text-primary">
          {goal.percent}% saved
        </span>
      </ProgressRing>

      <p className="mt-6 text-sm text-slate">Saved so far · all time</p>
      <p className="mt-2 text-[40px] font-medium leading-none tracking-tight text-ink">
        {money(goal.saved)}
      </p>
      <p className="mt-3 text-sm text-slate">of {money(goal.target)} target</p>

      <p className="mt-5 rounded-md bg-primary/10 px-3 py-1.5 text-[13px] font-medium text-primary">
        {goal.remaining > 0
          ? `${formatCurrency(goal.remaining, { decimals: "auto" })} to go`
          : "Goal reached"}
      </p>

      <div className="mt-6 flex w-full items-center gap-3 border-t border-mist pt-6 text-left">
        <FiCalendar aria-hidden="true" className="text-primary" size={18} />
        <div>
          <p className="text-[13px] text-slate">Target date</p>
          <p className="font-medium text-ink">{formatFullDate(goal.targetDate)}</p>
        </div>
      </div>
    </Card>
  );
}
