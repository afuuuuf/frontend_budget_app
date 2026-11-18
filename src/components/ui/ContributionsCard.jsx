import { FiDownload } from "react-icons/fi";
import { formatCurrency } from "@/utils/moneyUtil";

export function ContributionsCard({ amount, monthName }) {
  return (
    <section className="rounded-2xl bg-primary/10 p-6">
      <div className="flex items-center gap-3">
        <FiDownload aria-hidden="true" size={18} className="text-primary" />
        <h2 className="text-[15px] text-ink">{monthName} contributions</h2>
      </div>
      <p className="mt-3 text-[32px] font-medium leading-tight tracking-tight text-ink">
        {formatCurrency(amount, { signed: true })}
      </p>
      <p className="mt-3 text-[13px] text-slate">
        Transfers from your everyday account
      </p>
      <p className="mt-4 text-[13px] text-primary">
        Every small contribution brings your goals closer.
      </p>
    </section>
  );
}
