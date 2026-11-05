import { forwardRef } from "react";

export const Input = forwardRef(function Input(
  { id, invalid = false, adornment, className = "", ...props },
  ref,
) {
  return (
    <div className="relative">
      <input
        ref={ref}
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : `${id}-hint`}
        className={`h-14 w-full rounded-xl border bg-surface pl-4 pr-12 text-[15px] text-ink placeholder:text-slate/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
          invalid
            ? "border-terracotta focus:border-terracotta focus:ring-terracotta/20"
            : "border-mist"
        } ${className}`}
        {...props}
      />
      {adornment && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate">
          {adornment}
        </div>
      )}
    </div>
  );
});
