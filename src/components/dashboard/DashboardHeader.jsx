import { FiPlus } from "react-icons/fi";
import { APP_MOTTO } from "@/constants/app";
import { formatLongDate, getGreeting } from "@/utils/timeUtil";
import { MonthPicker } from "@/components/dashboard/MonthPicker";

export function DashboardHeader({
  name,
  year,
  month,
  onMonthChange,
  onAddTransaction,
}) {
  const now = new Date();

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[32px] font-medium leading-tight tracking-tight text-ink">
          {getGreeting(now)}
          {name && `, ${name}`}
        </h1>
        <p className="mt-2 text-[15px] text-slate">
          {formatLongDate(now)} · {APP_MOTTO}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <MonthPicker year={year} month={month} onChange={onMonthChange} />
        <button
          type="button"
          onClick={onAddTransaction}
          className="flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <FiPlus aria-hidden="true" size={18} />
          Add transaction
        </button>
      </div>
    </div>
  );
}
