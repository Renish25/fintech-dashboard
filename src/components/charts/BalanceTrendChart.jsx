import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { MONTHLY_DATA } from '../../data/mockData'
import { formatCurrency } from '../../utils/helpers'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-obsidian-800 border border-gray-200 dark:border-obsidian-500 rounded-xl p-3 shadow-xl">
      <p className="font-mono text-xs text-gray-400 dark:text-white/50 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-500 dark:text-white/60 capitalize">{p.dataKey}:</span>
          <span className="font-mono font-medium text-gray-800 dark:text-white">{formatCurrency(p.value, true)}</span>
        </div>
      ))}
    </div>
  )
}

export default function BalanceTrendChart() {
  return (
    <div
      className="card p-5 opacity-0 animate-fade-up"
      style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-base text-gray-900 dark:text-white">Balance Trend</h3>
          <p className="text-gray-400 dark:text-white/40 text-xs mt-0.5">6-month overview</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-gray-400 dark:text-white/50">
            <span className="w-3 h-0.5 bg-jade-400 rounded-full inline-block" />Income
          </span>
          <span className="flex items-center gap-1.5 text-gray-400 dark:text-white/50">
            <span className="w-3 h-0.5 bg-crimson-400 rounded-full inline-block" />Expenses
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={MONTHLY_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#34d399" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0}    />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#f87171" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#f87171" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="income"   stroke="#34d399" strokeWidth={2} fill="url(#incomeGrad)"  dot={{ fill: '#34d399', r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
          <Area type="monotone" dataKey="expenses" stroke="#f87171" strokeWidth={2} fill="url(#expenseGrad)" dot={{ fill: '#f87171', r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}