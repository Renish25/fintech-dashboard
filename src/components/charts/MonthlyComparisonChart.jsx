import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { MONTHLY_DATA } from '../../data/mockData'
import { formatCurrency } from '../../utils/helpers'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-obsidian-800 border border-gray-200 dark:border-obsidian-500 rounded-xl p-3 shadow-xl">
      <p className="font-mono text-xs text-gray-400 dark:text-white/40 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span className="text-gray-400 dark:text-white/40 capitalize">{p.dataKey}:</span>
          <span className="font-mono font-medium">{formatCurrency(p.value, true)}</span>
        </div>
      ))}
    </div>
  )
}

export default function MonthlyComparisonChart() {
  return (
    <div
      className="card p-5 opacity-0 animate-fade-up"
      style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
    >
      <div className="mb-6">
        <h3 className="font-display font-semibold text-base">Monthly Comparison</h3>
        <p className="text-gray-400 dark:text-white/40 text-xs mt-0.5">Income vs Expenses over 6 months</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={MONTHLY_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -10 }} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="income"   fill="#34d399" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
