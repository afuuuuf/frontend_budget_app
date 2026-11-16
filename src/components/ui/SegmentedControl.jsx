import { useId } from "react";

// A pill toggle built on native radio inputs, so arrow keys and screen readers work for free.
// options: [{ value, label }]
export function SegmentedControl({ label, options, value, onChange }) {
  const name = useId();

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="grid auto-cols-fr grid-flow-col rounded-xl bg-primary/10 p-1"
    >
      {options.map((option) => (
        <label key={option.value} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
            className="peer sr-only"
          />
          <span className="flex h-11 items-center justify-center rounded-lg text-sm text-slate transition-colors peer-checked:bg-surface peer-checked:font-semibold peer-checked:text-primary peer-checked:shadow-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
