import { subDays, subMonths, format } from 'date-fns'

export const CATEGORIES = {
  food:          { label: 'Food & Dining',  color: '#f59e0b', icon: '🍔' },
  transport:     { label: 'Transport',       color: '#8b5cf6', icon: '🚗' },
  shopping:      { label: 'Shopping',        color: '#ec4899', icon: '🛍️' },
  utilities:     { label: 'Utilities',       color: '#06b6d4', icon: '⚡' },
  health:        { label: 'Health',          color: '#10b981', icon: '💊' },
  entertainment: { label: 'Entertainment',   color: '#f97316', icon: '🎬' },
  salary:        { label: 'Salary',          color: '#34d399', icon: '💼' },
  freelance:     { label: 'Freelance',       color: '#a78bfa', icon: '💻' },
  investment:    { label: 'Investment',      color: '#60a5fa', icon: '📈' },
  rent:          { label: 'Rent',            color: '#fb7185', icon: '🏠' },
}

const now = new Date()

export const INITIAL_TRANSACTIONS = [
  // ── Income ────────────────────────────────────────────────────────────
  { id: 'txn_001', date: format(subDays(now,  2), 'yyyy-MM-dd'), description: 'Monthly Salary',         category: 'salary',    type: 'income',  amount: 85000 },
  { id: 'txn_002', date: format(subDays(now,  5), 'yyyy-MM-dd'), description: 'Freelance – Web Project', category: 'freelance', type: 'income',  amount: 12500 },
  { id: 'txn_003', date: format(subDays(now, 12), 'yyyy-MM-dd'), description: 'Dividend Payment',       category: 'investment',type: 'income',  amount:  3200 },
  { id: 'txn_004', date: format(subDays(now, 32), 'yyyy-MM-dd'), description: 'Monthly Salary',         category: 'salary',    type: 'income',  amount: 85000 },
  { id: 'txn_005', date: format(subDays(now, 38), 'yyyy-MM-dd'), description: 'Freelance – Logo Design', category: 'freelance', type: 'income',  amount:  5000 },
  { id: 'txn_006', date: format(subDays(now, 62), 'yyyy-MM-dd'), description: 'Monthly Salary',         category: 'salary',    type: 'income',  amount: 85000 },
  { id: 'txn_007', date: format(subDays(now, 68), 'yyyy-MM-dd'), description: 'Consulting Fee',         category: 'freelance', type: 'income',  amount: 18000 },
  // ── Expenses – current month ──────────────────────────────────────────
  { id: 'txn_008', date: format(subDays(now,  2), 'yyyy-MM-dd'), description: 'Apartment Rent',         category: 'rent',          type: 'expense', amount: 22000 },
  { id: 'txn_009', date: format(subDays(now,  3), 'yyyy-MM-dd'), description: 'Grocery Shopping',       category: 'food',          type: 'expense', amount:  2400 },
  { id: 'txn_010', date: format(subDays(now,  4), 'yyyy-MM-dd'), description: 'Uber Ride',              category: 'transport',     type: 'expense', amount:   340 },
  { id: 'txn_011', date: format(subDays(now,  5), 'yyyy-MM-dd'), description: 'Netflix + Spotify',      category: 'entertainment', type: 'expense', amount:   799 },
  { id: 'txn_012', date: format(subDays(now,  6), 'yyyy-MM-dd'), description: 'Electricity Bill',       category: 'utilities',     type: 'expense', amount:  1850 },
  { id: 'txn_013', date: format(subDays(now,  7), 'yyyy-MM-dd'), description: 'Dinner at Taj',          category: 'food',          type: 'expense', amount:  3200 },
  { id: 'txn_014', date: format(subDays(now,  8), 'yyyy-MM-dd'), description: 'Amazon Order',           category: 'shopping',      type: 'expense', amount:  4500 },
  { id: 'txn_015', date: format(subDays(now,  9), 'yyyy-MM-dd'), description: 'Gym Membership',         category: 'health',        type: 'expense', amount:  2000 },
  { id: 'txn_016', date: format(subDays(now, 10), 'yyyy-MM-dd'), description: 'Petrol',                 category: 'transport',     type: 'expense', amount:  2800 },
  { id: 'txn_017', date: format(subDays(now, 11), 'yyyy-MM-dd'), description: 'Pharmacy',               category: 'health',        type: 'expense', amount:   620 },
  { id: 'txn_018', date: format(subDays(now, 13), 'yyyy-MM-dd'), description: 'Internet Bill',          category: 'utilities',     type: 'expense', amount:  1299 },
  { id: 'txn_019', date: format(subDays(now, 14), 'yyyy-MM-dd'), description: 'Myntra Purchase',        category: 'shopping',      type: 'expense', amount:  3800 },
  { id: 'txn_020', date: format(subDays(now, 15), 'yyyy-MM-dd'), description: 'Movie Tickets',          category: 'entertainment', type: 'expense', amount:   960 },
  // ── Expenses – last month ─────────────────────────────────────────────
  { id: 'txn_021', date: format(subDays(now, 33), 'yyyy-MM-dd'), description: 'Apartment Rent',         category: 'rent',          type: 'expense', amount: 22000 },
  { id: 'txn_022', date: format(subDays(now, 34), 'yyyy-MM-dd'), description: 'Grocery Shopping',       category: 'food',          type: 'expense', amount:  2800 },
  { id: 'txn_023', date: format(subDays(now, 35), 'yyyy-MM-dd'), description: 'Train Ticket',           category: 'transport',     type: 'expense', amount:  1200 },
  { id: 'txn_024', date: format(subDays(now, 36), 'yyyy-MM-dd'), description: 'Mobile Bill',            category: 'utilities',     type: 'expense', amount:   599 },
  { id: 'txn_025', date: format(subDays(now, 40), 'yyyy-MM-dd'), description: 'Doctor Visit',           category: 'health',        type: 'expense', amount:  1500 },
  { id: 'txn_026', date: format(subDays(now, 42), 'yyyy-MM-dd'), description: 'Zara Shopping',          category: 'shopping',      type: 'expense', amount:  6200 },
  { id: 'txn_027', date: format(subDays(now, 44), 'yyyy-MM-dd'), description: 'Restaurant Lunch',       category: 'food',          type: 'expense', amount:  1400 },
  { id: 'txn_028', date: format(subDays(now, 46), 'yyyy-MM-dd'), description: 'Concert Tickets',        category: 'entertainment', type: 'expense', amount:  2500 },
  { id: 'txn_029', date: format(subDays(now, 50), 'yyyy-MM-dd'), description: 'Electricity Bill',       category: 'utilities',     type: 'expense', amount:  1650 },
  { id: 'txn_030', date: format(subDays(now, 55), 'yyyy-MM-dd'), description: 'Petrol',                 category: 'transport',     type: 'expense', amount:  2600 },
  // ── Expenses – two months ago ─────────────────────────────────────────
  { id: 'txn_031', date: format(subDays(now, 63), 'yyyy-MM-dd'), description: 'Apartment Rent',         category: 'rent',          type: 'expense', amount: 22000 },
  { id: 'txn_032', date: format(subDays(now, 64), 'yyyy-MM-dd'), description: 'Grocery Shopping',       category: 'food',          type: 'expense', amount:  3100 },
  { id: 'txn_033', date: format(subDays(now, 65), 'yyyy-MM-dd'), description: 'Ola Cabs',               category: 'transport',     type: 'expense', amount:   850 },
  { id: 'txn_034', date: format(subDays(now, 70), 'yyyy-MM-dd'), description: 'Electricity Bill',       category: 'utilities',     type: 'expense', amount:  2100 },
  { id: 'txn_035', date: format(subDays(now, 72), 'yyyy-MM-dd'), description: 'Flipkart Sale',          category: 'shopping',      type: 'expense', amount:  8900 },
  { id: 'txn_036', date: format(subDays(now, 75), 'yyyy-MM-dd'), description: 'Gym + Supplement',       category: 'health',        type: 'expense', amount:  3200 },
  { id: 'txn_037', date: format(subDays(now, 78), 'yyyy-MM-dd'), description: 'IPL Match Tickets',      category: 'entertainment', type: 'expense', amount:  4000 },
  { id: 'txn_038', date: format(subDays(now, 80), 'yyyy-MM-dd'), description: 'Restaurant Dinner',      category: 'food',          type: 'expense', amount:  2200 },
  { id: 'txn_039', date: format(subDays(now, 82), 'yyyy-MM-dd'), description: 'Mobile Recharge',        category: 'utilities',     type: 'expense', amount:   299 },
  { id: 'txn_040', date: format(subDays(now, 85), 'yyyy-MM-dd'), description: 'Book Purchase',          category: 'entertainment', type: 'expense', amount:   680 },
]

export const generateMonthlyData = () => {
  const months = []
  for (let i = 5; i >= 0; i--) {
    const month = subMonths(now, i)
    const label = format(month, 'MMM yy')
    const income   = 85000 + Math.floor(Math.random() * 20000)
    const expenses = 35000 + Math.floor(Math.random() * 15000)
    months.push({ month: label, income, expenses, balance: income - expenses })
  }
  return months
}

export const MONTHLY_DATA = generateMonthlyData()
