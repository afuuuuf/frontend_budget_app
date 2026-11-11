import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { formatCurrency } from "@/utils/currencyUtil";
import { formatMonthName } from "@/utils/timeUtil";
import { SeedlingIcon } from "@/components/ui/SeedlingIcon";

export function SavingsSummaryCard({ savings, year, month }) {
  const { totalSaved, goalCount, addedThisPeriod } = savings;

  return (
    <section className="flex flex-col rounded-2xl bg-primary/10 p-6">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-medium text-ink">Room for your future</h2>
        <SeedlingIcon size={20} className="text-primary" />
      </div>

      <p className="mt-5 text-[32px] font-medium leading-tight tracking-tight text-ink">
        {formatCurrency(totalSaved)}
      </p>
      <p className="mt-2 text-[13px] text-slate">
        {goalCount === 0
          ? "No savings goals yet"
          : `Total saved · across ${goalCount} ${goalCount === 1 ? "goal" : "goals"}`}
      </p>

      {addedThisPeriod > 0 && (
        <p className="mt-5 w-fit rounded-full bg-lime/70 px-3 py-1.5 text-[13px] font-medium text-primary">
          {formatCurrency(addedThisPeriod, { signed: true, decimals: "auto" })}{" "}
          added in {formatMonthName(year, month)}
        </p>
      )}

      <Link
        to={ROUTES.savings}
        className="mt-auto pt-6 text-sm font-semibold text-primary hover:underline"
      >
        View savings goals →
      </Link>
    </section>
  );
}
