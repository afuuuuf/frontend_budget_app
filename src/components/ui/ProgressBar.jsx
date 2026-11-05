const FILL = { ok: 'bg-primary', warning: 'bg-amber', over: 'bg-terracotta' }

// ratio: 0–1+ (spent ÷ limit). Anything past 1 still renders as a full bar.
export function ProgressBar({ ratio, status = 'ok', label }) {
  const width = Math.min(Math.max(ratio, 0), 1) * 100

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
      className="h-2 w-full overflow-hidden rounded-full bg-mist"
    >
      <div className={`h-full rounded-full ${FILL[status]}`} style={{ width: `${width}%` }} />
    </div>
  )
}
