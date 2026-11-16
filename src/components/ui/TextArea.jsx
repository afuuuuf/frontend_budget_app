import { forwardRef } from "react";

export const TextArea = forwardRef(function TextArea(
  { id, invalid = false, className = "", ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : `${id}-hint`}
      className={`min-h-[104px] w-full resize-none rounded-xl border bg-surface px-4 py-4 text-[15px] text-ink placeholder:text-slate/70 outline-none transition-colors focus:ring-2 ${
        invalid
          ? "border-terracotta focus:border-terracotta focus:ring-terracotta/20"
          : "border-mist focus:border-primary focus:ring-primary/20"
      } ${className}`}
      {...props}
    />
  );
});
