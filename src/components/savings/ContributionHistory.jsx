import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { ROUTES } from "@/constants/routes";
import { VISIBLE_CONTRIBUTIONS } from "@/constants/savings";
import { formatCurrency } from "@/utils/moneyUtil";
import { splitContributions } from "@/utils/savingsUtil";
import { formatFullDate, formatMonthYear, toDate } from "@/utils/timeUtil";

const money = (amount, options) => formatCurrency(amount, options);

// Latest contributions one by one; anything older is rolled into a single "Before …" row.
export function ContributionHistory({
  goalId,
  contributions,
  monthName,
  monthTotal,
}) {
  const { visible, hasEarlier, earlierTotal } = splitContributions(
    contributions,
    VISIBLE_CONTRIBUTIONS,
  );
  const oldestShown = visible.length ? toDate(visible[visible.length - 1].date) : null;

  return (
    <section className="overflow-hidden rounded-2xl border border-mist bg-surface">
      <div className="flex items-center justify-between gap-3 px-6 py-5">
        <h2 className="text-xl font-medium text-ink">Contribution history</h2>
        {monthTotal > 0 && (
          <p className="rounded-md bg-primary/10 px-3 py-1.5 text-[13px] font-medium text-primary">
            {money(monthTotal, { signed: true, decimals: "auto" })} in {monthName}
          </p>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="border-t border-mist px-6 py-10 text-center">
          <p className="text-ink">No contributions yet.</p>
          <Link
            to={ROUTES.savingsAddMoney(goalId)}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <FiPlus aria-hidden="true" size={16} />
            Add the first one
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left">
            <thead className="bg-ivory text-xs text-slate">
              <tr>
                <th scope="col" className="px-6 py-3 font-normal">Date</th>
                <th scope="col" className="px-6 py-3 font-normal">Source</th>
                <th scope="col" className="px-6 py-3 text-right font-normal">
                  Contribution
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((contribution) => (
                <tr key={contribution.id} className="border-t border-mist">
                  <td className="px-6 py-5 text-sm font-medium text-ink">
                    <time dateTime={contribution.date}>
                      {formatFullDate(contribution.date)}
                    </time>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-ink">Everyday account</p>
                    <p className="text-xs text-slate">
                      {contribution.note || "Savings transfer"}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-right text-[15px] font-semibold text-primary">
                    {money(contribution.amount, { signed: true })}
                  </td>
                </tr>
              ))}
              {hasEarlier && (
                <tr className="border-t border-mist">
                  <td className="px-6 py-4 text-[13px] text-slate" colSpan={2}>
                    Before{" "}
                    {formatMonthYear(
                      oldestShown.getFullYear(),
                      oldestShown.getMonth() + 1,
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-ink">
                    {money(earlierTotal)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
