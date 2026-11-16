import { Link } from "react-router-dom";

// A router link that looks like the primary button, optionally with a leading icon.
export function LinkButton({ to, icon: Icon, children, className = "" }) {
  return (
    <Link
      to={to}
      className={`inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      {Icon && <Icon aria-hidden="true" size={18} />}
      {children}
    </Link>
  );
}
