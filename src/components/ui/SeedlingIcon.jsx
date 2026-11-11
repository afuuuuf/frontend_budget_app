// Two leaves on a stem. Stands in for the "savings" glyph in the designs.
export function SeedlingIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21v-9" />
      <path d="M12 12C12 8 9 6 5 6c0 4 3 6 7 6z" />
      <path d="M12 14c0-3 2.5-5 6-5 0 3.5-2.5 5-6 5z" />
    </svg>
  )
}
