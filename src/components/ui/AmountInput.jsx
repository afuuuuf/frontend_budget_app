import { forwardRef } from "react";
import { getCurrencySymbol } from "@/utils/currencyUtil";

// Large money field with the currency symbol in front. Holds text; the schema parses it.
export const AmountInput = forwardRef(function AmountInput(
  { id, invalid = false, ...props },
  ref,
) {
  return (
    <div
      className={`flex h-[72px] items-center gap-2 rounded-xl border bg-surface px-5 transition-colors focus-within:ring-2 ${
        invalid
          ? "border-terracotta focus-within:border-terracotta focus-within:ring-terracotta/20"
          : "border-mist focus-within:border-primary focus-within:ring-primary/20"
      }`}
    >
      <span aria-hidden="true" className="text-[28px] font-semibold text-ink">
        {getCurrencySymbol()}
      </span>
      <input
        ref={ref}
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        placeholder="0.00"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : `${id}-hint`}
        className="w-full bg-transparent text-[28px] font-semibold text-ink outline-none placeholder:text-slate/40"
        {...props}
      />
    </div>
  );
});
