import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react'
import { formatCurrency } from '../../utils/helpers'
import clsx from 'clsx'

const ACCENT = {
  jade:   'text-jade-400   bg-jade-400/10   border-jade-400/20',
  violet: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  crimson:'text-crimson-400 bg-crimson-400/10 border-crimson-400/20',
  amber:  'text-amber-400  bg-amber-400/10  border-amber-400/20',
}

function StatCard({ title, value, change, icon: Icon, accent, delay = 0 }) {
  const positive = parseFloat(change) >= 0

  return (
    <div
      className="card p-5 flex flex-col gap-4 opacity-0 animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-500 dark:text-white/50 text-sm">{title}</p>
        <div className={clsx('w-9 h-9 rounded-xl border flex items-center justify-center', ACCENT[accent])}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <p className="font-display font-bold text-2xl leading-none text-gray-900 dark:text-white">{value}</p>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-1.5">
            {positive
              ? <TrendingUp   className="w-3 h-3 text-jade-400"   />
              : <TrendingDown className="w-3 h-3 text-crimson-400" />
            }
            <span className={clsx('text-xs font-mono', positive ? 'text-jade-400' : 'text-crimson-400')}>
              {positive ? '+' : ''}{change}%
            </span>
            <span className="text-gray-400 dark:text-white/30 text-xs">vs last month</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SummaryCards({ summary }) {
  const { balance, totalIncome, totalExpenses, incomeChange, expensesChange, savingsRate } = summary

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Balance"  value={formatCurrency(balance, true)}       icon={Wallet}      accent="jade"   delay={0}   />
      <StatCard title="Total Income"   value={formatCurrency(totalIncome, true)}   change={incomeChange}   icon={TrendingUp}   accent="violet" delay={100} />
      <StatCard title="Total Expenses" value={formatCurrency(totalExpenses, true)} change={expensesChange} icon={TrendingDown} accent="crimson" delay={200} />
      <StatCard title="Savings Rate"   value={`${savingsRate}%`}                    icon={PiggyBank}   accent="amber"  delay={300} />
    </div>
  )
}