import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiChevronDown,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiPieChart,
  FiRepeat,
} from "react-icons/fi";
import { ROUTES } from "@/constants/routes";
import { APP_MOTTO } from "@/constants/app";
import { useAuth } from "@/context/AuthContext";
import { getDisplayName, getInitials } from "@/utils/userUtil";
import { BrandBadge } from "@/components/ui/BrandBadge";
import { SeedlingIcon } from "@/components/ui/SeedlingIcon";

const NAV_ITEMS = [
  { to: ROUTES.home, label: "Home", icon: FiHome, end: true },
  { to: ROUTES.budgets, label: "Budgets", icon: FiPieChart },
  { to: ROUTES.transactions, label: "Transactions", icon: FiRepeat },
  { to: ROUTES.savings, label: "Savings", icon: SeedlingIcon },
];

function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const name = getDisplayName(user?.email) || "Your account";

  return (
    <div ref={ref} className="relative border-t border-mist px-4 py-4">
      {open && (
        <div className="absolute inset-x-4 bottom-full mb-2 rounded-xl border border-mist bg-surface p-1 shadow-lg">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink hover:bg-ivory"
          >
            <FiLogOut aria-hidden="true" /> Log out
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex w-full items-center gap-3 rounded-lg text-left"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-xs font-semibold text-primary">
          {getInitials(user?.email)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-ink">
            {name}
          </span>
          <span className="block text-xs text-slate">Personal account</span>
        </span>
        <FiChevronDown aria-hidden="true" className="text-slate" />
      </button>
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-6 pt-6">
        <BrandBadge />
      </div>

      <nav aria-label="Main" className="flex flex-col gap-1 px-4">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex h-12 items-center gap-3 rounded-xl px-3 text-[15px] transition-colors ${
                isActive
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-ink/80 hover:bg-primary/5"
              }`
            }
          >
            <Icon size={20} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="mx-4 mb-5 rounded-xl bg-ivory p-4">
          <SeedlingIcon size={18} className="text-primary" />
          <p className="mt-4 text-sm text-ink">{APP_MOTTO}</p>
        </div>

        <a
          href="#"
          className="mx-4 mb-4 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate hover:text-ink"
        >
          <FiHelpCircle size={18} aria-hidden="true" /> Help &amp; support
        </a>

        <UserMenu />
      </div>
    </div>
  );
}
