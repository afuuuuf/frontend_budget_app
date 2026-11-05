import { forwardRef } from "react";
import { FiArrowRight } from "react-icons/fi";

export const Button = forwardRef(function Button(
  {
    children,
    loading = false,
    icon = true,
    className = "",
    disabled,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-medium text-white transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-hidden="true"
        />
      ) : (
        icon && <FiArrowRight aria-hidden="true" />
      )}
      {children}
    </button>
  );
});
