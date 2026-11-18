import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  outline: "border border-mist bg-surface text-primary hover:bg-ivory",
};

// A router link that looks like a button, optionally with a leading icon.
export function LinkButton({
  to,
  icon: Icon,
  variant = "primary",
  children,
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${VARIANTS[variant]} ${className}`}
    >
      {Icon && <Icon aria-hidden="true" size={18} />}
      {children}
    </Link>
  );
}
