import { useDispatch } from 'react-redux'
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { setActivePage } from '../../store/slices/uiSlice'
import { formatCurrency, formatDate, getCategoryInfo } from '../../utils/helpers'
import clsx from 'clsx'

export default function RecentTransactions({ transactions }) {
  const dispatch = useDispatch()
  const recent   = transactions.slice(0, 6)

  return (
    <div
      className="card p-5 opacity-0 animate-fade-up"
      style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-semibold text-base text-gray-900 dark:text-white">Recent Transactions</h3>
          <p className="text-gray-400 dark:text-white/40 text-xs mt-0.5">Latest activity</p>
        </div>
        <button
          onClick={() => dispatch(setActivePage('transactions'))}
          className="text-jade-400 hover:text-jade-300 text-xs transition-colors"
        >
          View all →
        </button>
      </div>

      {recent.length === 0 ? (
        <p className="text-gray-400 dark:text-white/30 text-sm text-center py-8">No transactions yet</p>
      ) : (
        <div className="flex flex-col gap-1">
          {recent.map((txn, i) => {
            const cat      = getCategoryInfo(txn.category)
            const isIncome = txn.type === 'income'
            return (
              <div
                key={txn.id}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-obsidian-700 transition-colors cursor-default opacity-0 animate-fade-up"
                style={{ animationDelay: `${600 + i * 50}ms`, animationFillMode: 'forwards' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: `${cat.color}18` }}
                >
                  {cat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate text-gray-800 dark:text-white">{txn.description}</p>
                  <p className="text-gray-400 dark:text-white/35 text-xs font-mono">{formatDate(txn.date)}</p>
                </div>
                <div className={clsx('flex items-center gap-1 font-mono font-medium text-sm', isIncome ? 'text-jade-400' : 'text-crimson-400')}>
                  {isIncome
                    ? <ArrowUpRight  className="w-3.5 h-3.5" />
                    : <ArrowDownLeft className="w-3.5 h-3.5" />
                  }
                  {isIncome ? '+' : '-'}{formatCurrency(txn.amount, true)}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}