import { FiInfo } from "react-icons/fi";

// A soft green note with an info icon.
export function Callout({ children }) {
  return (
    <p className="flex items-start gap-3 rounded-xl bg-primary/10 p-4 text-[13px] text-primary">
      <FiInfo aria-hidden="true" className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}
