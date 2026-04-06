import { useDispatch, useSelector } from 'react-redux'
import { Pencil, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { deleteTransaction } from '../../store/slices/transactionsSlice'
import { openModal, selectRole } from '../../store/slices/uiSlice'
import { formatCurrency, formatDate, getCategoryInfo } from '../../utils/helpers'
import clsx from 'clsx'

export default function TransactionRow({ txn, index }) {
  const dispatch = useDispatch()
  const role     = useSelector(selectRole)
  const isAdmin  = role === 'admin'
  const cat      = getCategoryInfo(txn.category)
  const isIncome = txn.type === 'income'

  return (
    <div
      // className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-obsidian-700 transition-colors group opacity-0 animate-fade-up"
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-obsidian-700 transition-colors group opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'forwards' }}
    >
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
        style={{ background: `${cat.color}18` }}
      >
        {cat.icon}
      </div>

      {/* Description + date */}
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{txn.description}</p>
        <p className="text-gray-400 dark:text-white/35 text-xs font-mono">{formatDate(txn.date)}</p>
      </div>

      {/* Category badge – hidden on small screens */}
      <div className="hidden md:block">
        <span
          className="badge"
          style={{ color: cat.color, background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}
        >
          {cat.label}
        </span>
      </div>

      {/* Amount */}
      <div className={clsx(
        'flex items-center gap-1 font-mono font-semibold text-sm w-24 justify-end',
        isIncome ? 'text-jade-400' : 'text-crimson-400',
      )}>
        {isIncome ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownLeft className="w-3.5 h-3.5" />}
        {isIncome ? '+' : '-'}{formatCurrency(txn.amount, true)}
      </div>

      {/* Admin actions */}
      {isAdmin && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => dispatch(openModal({ type: 'edit', data: txn }))}
            className="p-1.5 rounded-lg dark:hover:text-white dark:text-white/40 hover:bg-obsidian-600 hover:text-white transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => dispatch(deleteTransaction(txn.id))}
            className="p-1.5 rounded-lg dark:hover:text-crimson-400 dark:text-white/40 hover:bg-crimson-500/20 hover:text-crimson-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
