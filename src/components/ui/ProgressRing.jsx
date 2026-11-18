// A circular progress meter with room for content in the middle.
// ratio: 0–1 (values outside are clamped).
export function ProgressRing({
  ratio,
  label,
  size = 170,
  strokeWidth = 8,
  children,
}) {
  const clamped = Math.min(Math.max(ratio, 0), 1);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const circle = {
    cx: size / 2,
    cy: size / 2,
    r: radius,
    fill: "none",
    strokeWidth,
  };

  return (
    <div
      role="img"
      aria-label={label}
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* -rotate-90 starts the arc at 12 o'clock instead of 3 o'clock */}
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle {...circle} stroke="currentColor" className="text-mist" />
        <circle
          {...circle}
          stroke="currentColor"
          className="text-primary transition-[stroke-dashoffset] duration-500"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
