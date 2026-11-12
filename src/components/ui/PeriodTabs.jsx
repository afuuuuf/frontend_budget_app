// Only Monthly exists in the backend today; Weekly and Yearly are shown but switched off.
const OPTIONS = [
  { value: "WEEKLY", label: "Weekly", enabled: false },
  { value: "MONTHLY", label: "Monthly", enabled: true },
  { value: "YEARLY", label: "Yearly", enabled: false },
];

export function PeriodTabs({ value = "MONTHLY" }) {
  return (
    <div
      role="radiogroup"
      aria-label="Budget period"
      className="grid grid-cols-3 rounded-xl bg-primary/10 p-1"
    >
      {OPTIONS.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={!option.enabled}
            title={option.enabled ? undefined : "Coming soon"}
            className={`h-11 rounded-lg text-sm transition-colors ${
              selected
                ? "bg-surface font-semibold text-primary shadow-sm"
                : "cursor-not-allowed text-slate"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
