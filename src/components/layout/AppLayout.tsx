import { Outlet, useLocation } from 'react-router'
import { AppHeader } from '../shared/AppHeader'
import { BottomNav } from '../shared/BottomNav'
import { HEADER, NAV_ITEMS, PAGE_SUBTITLES } from './data'

export function AppLayout() {
  const { pathname } = useLocation()

  return (
    <div className="flex flex-col min-h-dvh bg-surface text-on-surface">
      <AppHeader {...HEADER} subtitle={PAGE_SUBTITLES[pathname] ?? ''} />
      <main className="flex-1 flex flex-col relative w-full pt-header pb-24 bg-surface">
        <Outlet />
      </main>
      <BottomNav items={NAV_ITEMS} />
    </div>
  )
}
