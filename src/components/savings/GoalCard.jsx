import { Link } from "react-router-dom";
import { FiChevronRight, FiPlus } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ROUTES } from "@/constants/routes";
import { SAVINGS_STATUS } from "@/enums";
import { formatCurrency } from "@/utils/moneyUtil";
import { formatEnumLabel } from "@/utils/enumUtil";
import { formatMediumDate } from "@/utils/timeUtil";
import { getGoalIcon } from "@/components/savings/goalIcons";

const money = (amount, options) =>
  formatCurrency(amount, { decimals: "auto", ...options });

export function GoalCard({ goal, monthContribution, monthName }) {
  const Icon = getGoalIcon(goal.icon);

  return (
    // `relative` + the name link's ::after make the whole card open the goal. The "Add money"
    // link sits above it (z-10) so it still gets its own clicks.
    <Card className="relative flex flex-col transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon aria-hidden="true" size={22} />
          </span>
          <div>
            <h3 className="text-xl font-medium text-ink">
              <Link
                to={ROUTES.savingsDetail(goal.id)}
                className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-primary"
              >
                {goal.name}
              </Link>
            </h3>
            <p className="mt-1 text-[13px] text-slate">
              Target · {formatMediumDate(goal.targetDate)}
            </p>
          </div>
        </div>
        <FiChevronRight aria-hidden="true" className="mt-1 text-primary" />
      </div>

      {goal.status !== SAVINGS_STATUS.ACTIVE && (
        <p className="mt-4 w-fit rounded-md bg-ivory px-2.5 py-1 text-xs font-medium text-slate">
          {formatEnumLabel(goal.status)}
        </p>
      )}

      <p className="mt-6">
        <span className="text-[32px] font-medium leading-none tracking-tight text-ink">
          {money(goal.saved)}
        </span>{" "}
        <span className="text-[15px] text-slate">of {money(goal.target)}</span>
      </p>

      <div className="mt-4">
        <ProgressBar ratio={goal.ratio} label={`${goal.name} progress`} />
      </div>
      <div className="mt-3 flex items-center justify-between text-[13px]">
        <span className="font-semibold text-primary">
          {goal.percent}% saved
        </span>
        <span className="text-slate">
          {goal.remaining > 0 ? `${money(goal.remaining)} to go` : "Goal reached"}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-mist pt-5">
        <p className="text-[13px] text-slate">
          {money(monthContribution, { signed: true })} added in {monthName}
        </p>
        <Link
          to={ROUTES.savingsAddMoney(goal.id)}
          className="relative z-10 flex h-11 items-center gap-2 rounded-xl border border-mist bg-surface px-4 text-sm font-medium text-primary transition-colors hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          <FiPlus aria-hidden="true" size={16} />
          Add money
        </Link>
      </div>
    </Card>
  );
}
