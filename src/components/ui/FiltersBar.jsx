import { useDispatch, useSelector } from 'react-redux'
import { Search, SlidersHorizontal, ArrowUpDown, RotateCcw, Download } from 'lucide-react'
import { setFilter, resetFilters, selectFilters } from '../../store/slices/filtersSlice'
import { selectAllTransactions } from '../../store/slices/transactionsSlice'
import { CATEGORIES } from '../../data/mockData'
import { applyFilters, exportToCSV } from '../../utils/helpers'
import clsx from 'clsx'

export default function FiltersBar() {
  const dispatch     = useDispatch()
  const filters      = useSelector(selectFilters)
  const transactions = useSelector(selectAllTransactions)

  const filtered = applyFilters(transactions, filters)

  const hasActiveFilters =
    filters.search || filters.type !== 'all' || filters.category !== 'all'

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1 – search + export */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
          <input
            className="input w-full pl-9"
            placeholder="Search transactions…"
            value={filters.search}
            onChange={(e) => dispatch(setFilter({ key: 'search', value: e.target.value }))}
          />
        </div>
        <button
          onClick={() => exportToCSV(filtered)}
          className="btn-ghost flex items-center gap-2 text-sm flex-shrink-0"
          title="Export filtered transactions as CSV"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Row 2 – type / category / sort */}
      <div className="flex flex-wrap gap-2 items-center">
        <SlidersHorizontal className="w-4 h-4 text-gray-400 dark:text-white/30 flex-shrink-0" />

        {/* Type filter */}
        <div className="flex gap-1">
          {['all', 'income', 'expense'].map((t) => (
            <button
              key={t}
              onClick={() => dispatch(setFilter({ key: 'type', value: t }))}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs font-body border transition-all capitalize',
                filters.type === t
                  ? 'bg-jade-500/20 border-jade-500/60 text-jade-400'
                  : 'border-obsidian-500 text-gray-400 dark:text-white/30 hover:bg-gray-100 dark:hover:bg-obsidian-700',
              )}
            >
              {t === 'all' ? 'All' : t === 'income' ? '↑ Income' : '↓ Expense'}
            </button>
          ))}
        </div>

        {/* Category */}
        <select
          className="input py-1.5 text-xs"
          value={filters.category}
          onChange={(e) => dispatch(setFilter({ key: 'category', value: e.target.value }))}
        >
          <option value="all">All categories</option>
          {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
            <option key={key} value={key}>{icon} {label}</option>
          ))}
        </select>

        {/* Sort */}
        <div className="flex gap-1 ml-auto">
          <select
            className="input py-1.5 text-xs"
            value={filters.sortBy}
            onChange={(e) => dispatch(setFilter({ key: 'sortBy', value: e.target.value }))}
          >
            <option value="date">Sort: Date</option>
            <option value="amount">Sort: Amount</option>
          </select>
          <button
            onClick={() =>
              dispatch(setFilter({ key: 'sortDir', value: filters.sortDir === 'desc' ? 'asc' : 'desc' }))
            }
            className="btn-ghost p-2"
            title="Toggle sort direction"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={() => dispatch(resetFilters())}
            className="flex items-center gap-1.5 text-xs text-crimson-400 hover:text-crimson-300 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
