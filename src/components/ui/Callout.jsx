import { FiInfo } from "react-icons/fi";

// A soft green note with an icon (info by default).
export function Callout({ icon: Icon = FiInfo, children }) {
  return (
    <p className="flex items-start gap-3 rounded-xl bg-primary/10 p-4 text-[13px] text-primary">
      <Icon aria-hidden="true" className="mt-0.5 shrink-0" size={16} />
      <span>{children}</span>
    </p>
  );
}
