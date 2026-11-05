import { useRef } from "react";
import { FiCalendar } from "react-icons/fi";
import { formatMonthYear, toMonthValue } from "@/utils/timeUtil";

// A pill that opens the browser's native month picker.
export function MonthPicker({ year, month, onChange }) {
  const inputRef = useRef(null);

  const open = () => {
    const input = inputRef.current;
    if (!input) return;
    if (typeof input.showPicker === "function") input.showPicker();
    else input.focus();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={open}
        className="flex h-12 items-center gap-2 rounded-xl border border-mist bg-surface px-4 text-sm font-medium text-ink hover:bg-ivory"
      >
        <FiCalendar aria-hidden="true" className="text-primary" />
        {formatMonthYear(year, month)}
      </button>
      <input
        ref={inputRef}
        type="month"
        tabIndex={-1}
        aria-label="Choose month"
        value={toMonthValue(year, month)}
        onChange={(e) => e.target.value && onChange(e.target.value)}
        className="pointer-events-none absolute inset-0 opacity-0"
      />
    </div>
  );
}
