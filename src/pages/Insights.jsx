import { useSelector } from 'react-redux'
import { selectAllTransactions } from '../store/slices/transactionsSlice'
import {
  computeSummary, computeCategoryBreakdown,
  formatCurrency, getCategoryInfo,
} from '../utils/helpers'
import MonthlyComparisonChart from '../components/charts/MonthlyComparisonChart'
import SpendingBreakdown      from '../components/charts/SpendingBreakdown'
import { TrendingUp, TrendingDown, Flame, Lightbulb, Award, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'

// ── Insight card ──────────────────────────────────────────────────────────────
function InsightCard({ icon: Icon, iconColor, title, value, sub, delay = 0 }) {
  return (
    <div
      className="card p-5 flex items-start gap-4 opacity-0 animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', iconColor)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-gray-500 dark:text-white/70 text-xs font-mono uppercase tracking-wider">{title}</p>
        <p className="font-display font-bold text-lg mt-0.5">{value}</p>
        {sub && <p className="text-gray-400 dark:text-white/40 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ── Tip card ──────────────────────────────────────────────────────────────────
function TipCard({ icon, tip, delay = 0 }) {
  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl bg-gray-100 dark:bg-obsidian-700 border border-gray-50 dark:border-obsidian-500 opacity-0 animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <span className="text-xl flex-shrink-0">{icon}</span>
      <p className="dark:text-gray-300 text-gray-500 text-sm leading-relaxed">{tip}</p>
    </div>
  )
}

export default function Insights() {
  const transactions = useSelector(selectAllTransactions)
  const summary      = computeSummary(transactions)
  const breakdown    = computeCategoryBreakdown(transactions)

  const topCategory  = breakdown[0]
  const savingsNum   = parseFloat(summary.savingsRate)
  const incomeChange = parseFloat(summary.incomeChange)
  const expChange    = parseFloat(summary.expensesChange)

  // Generate tips based on data
  const tips = []
  if (savingsNum < 20)
    tips.push({ icon: '💡', tip: `Your savings rate is ${savingsNum}%. Financial experts recommend saving at least 20% of your income.` })
  if (topCategory)
    tips.push({ icon: '🔍', tip: `Your highest spend category is "${topCategory.label}" at ${topCategory.pct}% of total expenses (${formatCurrency(topCategory.value)}). Look for ways to trim here first.` })
  if (expChange > 10)
    tips.push({ icon: '⚠️', tip: `Expenses rose ${expChange}% this month compared to last. Review your recent transactions to spot any unplanned spending.` })
  if (incomeChange > 0)
    tips.push({ icon: '🎉', tip: `Income increased by ${incomeChange}% this month — great work! Consider channeling the extra into savings or investments.` })
  if (tips.length === 0)
    tips.push({ icon: '✅', tip: 'Your finances look healthy this month. Keep up the great habits!' })

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Key insight cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard
          icon={Flame}
          iconColor="bg-amber-400/10 text-amber-400"
          title="Top Category"
          value={topCategory ? topCategory.label : '—'}
          sub={topCategory ? `${topCategory.pct}% of expenses` : 'No data'}
          delay={0}
        />
        <InsightCard
          icon={Award}
          iconColor="bg-jade-400/10 text-jade-400"
          title="Savings Rate"
          value={`${summary.savingsRate}%`}
          sub={savingsNum >= 20 ? '✅ Above target' : '⚠️ Below 20% target'}
          delay={100}
        />
        <InsightCard
          icon={incomeChange >= 0 ? TrendingUp : TrendingDown}
          iconColor={incomeChange >= 0 ? 'bg-jade-400/10 text-jade-400' : 'bg-crimson-400/10 text-crimson-400'}
          title="Income Change"
          value={`${incomeChange >= 0 ? '+' : ''}${summary.incomeChange}%`}
          sub="vs last month"
          delay={200}
        />
        <InsightCard
          icon={expChange > 0 ? AlertTriangle : TrendingDown}
          iconColor={expChange > 5 ? 'bg-crimson-400/10 text-crimson-400' : 'bg-jade-400/10 text-jade-400'}
          title="Expense Change"
          value={`${expChange >= 0 ? '+' : ''}${summary.expensesChange}%`}
          sub="vs last month"
          delay={300}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <MonthlyComparisonChart />
        </div>
        <SpendingBreakdown breakdown={breakdown} />
      </div>

      {/* Category breakdown table */}
      <div
        className="card p-5 opacity-0 animate-fade-up"
        style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
      >
        <h3 className="font-display font-semibold text-base mb-5">Full Category Breakdown</h3>
        {breakdown.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-8">No expense data</p>
        ) : (
          <div className="flex flex-col gap-3">
            {breakdown.map((item, i) => (
              <div key={item.key} className="flex items-center gap-4">
                <span className="text-lg w-6 text-center">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500 dark:text-white/80">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-gray-500 dark:text-white/40">{item.pct}%</span>
                      <span className="font-mono font-semibold text-sm">{formatCurrency(item.value)}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-200 dark:bg-obsidian-600 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${item.pct}%`,
                        background: item.color,
                        transitionDelay: `${i * 50}ms`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Smart tips */}
      <div
        className="card p-5 opacity-0 animate-fade-up"
        style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h3 className="font-display font-semibold text-base">Smart Tips</h3>
        </div>
        <div className="flex flex-col gap-3">
          {tips.map((tip, i) => (
            <TipCard key={i} icon={tip.icon} tip={tip.tip} delay={500 + i * 80} />
          ))}
        </div>
      </div>
    </div>
  )
}
