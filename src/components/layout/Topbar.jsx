import { FiBell, FiMenu } from 'react-icons/fi'
import { useMatches } from 'react-router-dom'
import { ACCOUNT_LABEL, DEFAULT_CURRENCY } from '@/constants/app'

export function Topbar({ onMenuClick }) {
  // Pages set their breadcrumb label with `handle: { title }` in the router.
  const matches = useMatches()
  const title = [...matches].reverse().find((m) => m.handle?.title)?.handle.title

  return (
    <header className="flex h-16 items-center justify-between border-b border-mist bg-surface px-5 sm:px-10">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="-ml-2 rounded-lg p-2 text-ink hover:bg-ivory lg:hidden"
        >
          <FiMenu size={20} />
        </button>
        <p className="text-sm text-slate">
          Personal workspace <span className="mx-2">/</span>
          <span className="font-semibold text-ink">{title}</span>
        </p>
      </div>

      <div className="flex items-center gap-5">
        <p className="hidden text-sm text-slate sm:block">
          {ACCOUNT_LABEL} · {DEFAULT_CURRENCY}
        </p>
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-primary hover:bg-ivory"
        >
          <FiBell size={20} />
        </button>
      </div>
    </header>
  )
}
