import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Moon, Sun, ChevronDown } from 'lucide-react'
import {
  setRole, toggleDarkMode, 
  closeSidebar,
  selectRole, selectDarkMode,
} from '../../store/slices/uiSlice'
import clsx from 'clsx'

const NAV_ITEMS = [
  { path: '/',             label: 'Overview',      icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions',  icon: ArrowLeftRight  },
  { path: '/insights',     label: 'Insights',      icon: Lightbulb       },
]

export default function Sidebar() {
  const dispatch = useDispatch()
  const role     = useSelector(selectRole)
  const darkMode = useSelector(selectDarkMode)

  const handleNav = () => {
    dispatch(closeSidebar())
    // onClose?.()
  }

  return (
    <aside className="flex flex-col h-full w-64 p-5 gap-6
                      bg-white border-r border-gray-200
                      dark:bg-obsidian-800 dark:border-obsidian-600
                      transition-colors duration-200">

      {/* Logo */}
      <div className="flex items-center gap-3 px-1 pt-1">
        <div className="w-8 h-8 rounded-lg bg-jade-500 flex items-center justify-center">
          <span className="font-display font-bold text-white dark:text-obsidian-900 text-sm">F</span>
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">
          Finvue
        </span>
        <span className="ml-auto text-gray-400 dark:text-white/20 text-xs font-mono">v1.0</span>
      </div>

      {/* Role Selector */}
      <div className="px-1">
        <p className="text-gray-400 dark:text-white/30 text-xs font-mono uppercase tracking-widest mb-2">Role</p>
        <div className="relative">
          <select
            value={role}
            onChange={(e) => dispatch(setRole(e.target.value))}
            className="w-full input appearance-none pr-8 cursor-pointer"
          >
            <option value="admin">👑 Admin</option>
            <option value="viewer">👁️ Viewer</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40 w-4 h-4 pointer-events-none" />
        </div>
        <p className="text-gray-400 dark:text-white/25 text-xs mt-1.5">
          {role === 'admin' ? 'Full access — add, edit, delete' : 'Read-only view'}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-gray-400 dark:text-white/30 text-xs font-mono uppercase tracking-widest mb-1 px-1">Menu</p>
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            onClick={handleNav}
            className={({ isActive }) => isActive ? 'nav-item-active' : 'nav-item'}
          >
            <Icon className="w-4 h-4" />
            {label}
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-jade-400 opacity-0 [.nav-item-active_&]:opacity-100" />
          </NavLink>
        ))}
      </nav>

      {/* Dark mode toggle */}
      <button onClick={() => dispatch(toggleDarkMode())} className="nav-item justify-between">
        <span className="flex items-center gap-3">
          {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
        <div className={clsx(
          'w-9 h-5 rounded-full transition-colors duration-200 relative',
          darkMode ? 'bg-jade-500' : 'bg-gray-300',
        )}>
          <div className={clsx(
            'w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-transform duration-200',
            darkMode ? 'translate-x-4' : 'translate-x-0.5',
          )} />
        </div>
      </button>
    </aside>
  )
}