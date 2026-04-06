import { useDispatch, useSelector } from 'react-redux'
import { Menu, Bell, Plus } from 'lucide-react'
import { openModal, selectActivePage, selectRole } from '../../store/slices/uiSlice'

const PAGE_META = {
  dashboard:    { title: 'Overview',      sub: 'Your financial snapshot'     },
  transactions: { title: 'Transactions',  sub: 'All your money movements'    },
  insights:     { title: 'Insights',      sub: 'Smart spending analysis'     },
}

export default function Header({ onMenuClick }) {
  const dispatch   = useDispatch()
  const activePage = useSelector(selectActivePage)
  const role       = useSelector(selectRole)
  const { title, sub } = PAGE_META[activePage] || PAGE_META.dashboard

  return (
    <header className="flex items-center justify-between px-6 py-4 sticky top-0 z-30
                        border-b border-gray-200 bg-white/80
                        dark:border-obsidian-600 dark:bg-obsidian-900/80
                        backdrop-blur-md transition-colors duration-200">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden btn-ghost p-2">
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-display font-bold text-xl leading-tight text-gray-900 dark:text-white">{title}</h1>
          <p className="text-gray-400 dark:text-white/40 text-xs">{sub}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="btn-ghost p-2 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-jade-400 rounded-full" />
        </button>

        {role === 'admin' && (
          <button
            onClick={() => dispatch(openModal({ type: 'add' }))}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Transaction</span>
          </button>
        )}

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jade-400 to-violet-500 flex items-center justify-center text-sm font-display font-bold text-white">
          {role === 'admin' ? 'A' : 'V'}
        </div>
      </div>
    </header>
  )
}