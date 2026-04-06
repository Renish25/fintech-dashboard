import { useSelector } from 'react-redux'
import { selectAllTransactions } from '../store/slices/transactionsSlice'
import { computeSummary, computeCategoryBreakdown } from '../utils/helpers'
import SummaryCards      from '../components/ui/SummaryCards'
import BalanceTrendChart from '../components/charts/BalanceTrendChart'
import SpendingBreakdown from '../components/charts/SpendingBreakdown'
import RecentTransactions from '../components/ui/RecentTransactions'

export default function Dashboard() {
  const transactions = useSelector(selectAllTransactions)
  const summary      = computeSummary(transactions)
  const breakdown    = computeCategoryBreakdown(transactions)

  // Sort transactions by date descending for "recent"
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return (
    <div className="flex flex-col gap-6 p-6">
      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BalanceTrendChart />
        </div>
        <SpendingBreakdown breakdown={breakdown} />
      </div>

      <RecentTransactions transactions={sorted} />
    </div>
  )
}
