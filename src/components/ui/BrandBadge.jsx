import { APP_NAME } from '@/constants/app'

// Logo for light backgrounds: the mark on a teal tile, wordmark in ink.
// To use your own PNG, swap the <svg> for <img src={logoUrl} alt="" className="h-6 w-6" />.
export function BrandBadge({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
        <svg viewBox="0 0 28 28" className="h-6 w-6" fill="none" aria-hidden="true">
          <circle cx="14" cy="5" r="3.2" fill="#DDEDAD" />
          <path d="M3 11 C7 21 21 21 25 11" stroke="#F7F8F4" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M7 17 C10 23 18 23 21 17" stroke="#F7F8F4" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M11 22.5 C12.5 25 15.5 25 17 22.5" stroke="#F7F8F4" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>
      <span className="text-[28px] font-medium lowercase leading-none tracking-tight text-ink">
        {APP_NAME}
      </span>
    </div>
  )
}
