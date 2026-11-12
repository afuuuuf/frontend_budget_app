import { forwardRef } from "react";
import { FiChevronDown } from "react-icons/fi";

// options: [{ value, label, disabled? }]. A native <select>, so keyboard and screen readers just work.
export const CategorySelect = forwardRef(function CategorySelect(
  { id, options, invalid = false, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : `${id}-hint`}
        className={`h-14 w-full appearance-none rounded-xl border bg-surface pl-4 pr-12 text-[15px] text-ink outline-none transition-colors focus:ring-2 disabled:cursor-not-allowed disabled:bg-ivory disabled:text-slate ${
          invalid
            ? "border-terracotta focus:border-terracotta focus:ring-terracotta/20"
            : "border-mist focus:border-primary focus:ring-primary/20"
        }`}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      <FiChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate"
        size={20}
      />
    </div>
  );
});
