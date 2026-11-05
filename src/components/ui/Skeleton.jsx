export function Skeleton({ className = '' }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-2xl bg-mist/70 ${className}`} />
}
