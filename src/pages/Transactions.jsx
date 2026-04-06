import { useSelector } from 'react-redux'
import { selectAllTransactions } from '../store/slices/transactionsSlice'
import { selectFilters } from '../store/slices/filtersSlice'
import { applyFilters } from '../utils/helpers'
import FiltersBar from '../components/ui/FiltersBar'
import TransactionRow from '../components/ui/TransactionRow'
import { FileX } from 'lucide-react'
import { selectRole } from '../store/slices/uiSlice'

export default function Transactions() {
  const transactions = useSelector(selectAllTransactions)
  const filters = useSelector(selectFilters)
  const filtered = applyFilters(transactions, filters)
  const role = useSelector(selectRole)
  const isAdmin = role === 'admin'

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* Filters */}
      <div
        className="card p-4 opacity-0 animate-fade-up"
        style={{ animationFillMode: 'forwards' }}
      >
        <FiltersBar />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between px-1">
        <p className="text-white/40 text-xs font-mono">
          {filtered.length} transaction{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* List */}
      <div
        className="card p-3 opacity-0 animate-fade-up"
        style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
      >
        {/* Column headers */}
        <div className="flex items-center gap-3 px-4 py-2 text-gray-400 dark:text-white/30 text-xs font-mono uppercase tracking-wider border-b dark:border-obsidian-600 border-gray-200 mb-1">
          <div className="w-9 flex-shrink-0" />
          <div className="flex-1">Description</div>
          <div className="hidden md:block w-32">Category</div>
          <div className="w-24 text-right">Amount</div>
          {isAdmin && <div className="w-12" />} {/* actions header */}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400 dark:text-white/30">
            <FileX className="w-10 h-10" />
            <p className="text-sm">No transactions match your filters</p>
          </div>
        ) : (
          filtered.map((txn, i) => (
            <TransactionRow key={txn.id} txn={txn} index={i} />
          ))
        )}
      </div>
    </div>
  )
}
