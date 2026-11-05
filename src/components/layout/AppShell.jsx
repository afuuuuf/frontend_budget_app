import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'

export function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile drawer after navigating, or when Escape is pressed.
  useEffect(() => setDrawerOpen(false), [pathname])
  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (e) => e.key === 'Escape' && setDrawerOpen(false)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  return (
    <div className="min-h-screen bg-ivory lg:pl-56">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 border-r border-mist bg-surface lg:block">
        <Sidebar />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-surface shadow-xl">
            <Sidebar />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen flex-col">
        <Topbar onMenuClick={() => setDrawerOpen(true)} />
        <main className="flex-1 px-5 py-8 sm:px-10">
          <div className="mx-auto w-full max-w-[1136px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
