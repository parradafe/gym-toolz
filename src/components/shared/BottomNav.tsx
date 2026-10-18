import { NavLink } from 'react-router'
import { cx } from '../../lib/cx'
import { Icon } from './Icon'

export interface BottomNavItem {
  id: string
  icon: string
  label: string
  href: string
}

interface BottomNavProps {
  items: BottomNavItem[]
}

export function BottomNav({ items }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-bar-bottom">
      <div className="flex justify-around items-center h-nav px-space-xs">
        {items.map((item) => {
          return (
            <NavLink
              key={item.id}
              to={item.href}
              end
              className={({ isActive }) =>
                cx(
                  'flex flex-col items-center justify-center gap-space-xs min-w-[72px] h-14 rounded-lg transition-all',
                  isActive
                    ? 'bg-primary-container text-on-primary-container shadow-bar-top scale-105'
                    : 'text-on-surface-variant',
                )
              }
            >
              <Icon name={item.icon} />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-center leading-none">
                {item.label}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
