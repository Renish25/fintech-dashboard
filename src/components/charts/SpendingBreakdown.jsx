import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/helpers'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { value, payload: p } = payload[0]
  return (
    <div className="bg-white dark:bg-obsidian-800 border border-gray-200 dark:border-obsidian-500 rounded-xl p-3 shadow-xl">
      <p className="text-sm font-body text-gray-800 dark:text-white">{p.label}</p>
      <p className="font-mono text-jade-400 font-medium">{formatCurrency(value)}</p>
      <p className="text-gray-400 dark:text-white/40 text-xs">{p.pct}% of total</p>
    </div>
  )
}

export default function SpendingBreakdown({ breakdown }) {
  if (!breakdown.length) {
    return (
      <div className="card p-5 flex items-center justify-center h-64 text-gray-400 dark:text-white/30 text-sm">
        No expense data
      </div>
    )
  }

  const top5 = breakdown.slice(0, 5)

  return (
    <div
      className="card p-5 opacity-0 animate-fade-up"
      style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
    >
      <div className="mb-6">
        <h3 className="font-display font-semibold text-base text-gray-900 dark:text-white">Spending Breakdown</h3>
        <p className="text-gray-400 dark:text-white/40 text-xs mt-0.5">By category</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-36 h-36 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={top5} cx="50%" cy="50%" innerRadius={38} outerRadius={58} paddingAngle={3} dataKey="value">
                {top5.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {top5.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <span className="text-base leading-none">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-xs text-gray-600 dark:text-white/70 truncate">{item.label}</span>
                  <span className="text-xs font-mono text-gray-400 dark:text-white/50 ml-1">{item.pct}%</span>
                </div>
                <div className="h-1 bg-gray-200 dark:bg-obsidian-600 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.pct}%`, background: item.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}