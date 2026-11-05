import { useAuth } from '@/context/AuthContext'

// Placeholder so the login redirect has somewhere to land. Replaced when we build the dashboard.
export default function HomePage() {
  const { logout } = useAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-medium">You're in.</h1>
      <p className="text-slate">The dashboard comes next.</p>
      <button
        onClick={logout}
        className="rounded-xl border border-mist bg-surface px-5 py-2.5 text-sm font-medium hover:bg-ivory"
      >
        Log out
      </button>
    </div>
  )
}
