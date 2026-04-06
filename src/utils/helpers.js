import {
  format, parseISO, isWithinInterval,
  startOfMonth, endOfMonth, subMonths,
} from 'date-fns'
import { CATEGORIES } from '../data/mockData'

// Formatting 
export const formatCurrency = (amount, compact = false) => {
  if (compact && amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  if (compact && amount >= 1000)   return `₹${(amount / 1000).toFixed(1)}K`
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(amount)
}

export const formatDate = (dateStr) => format(parseISO(dateStr), 'dd MMM yyyy')

export const getCategoryInfo = (key) =>
  CATEGORIES[key] || { label: key, color: '#6b7280', icon: '💰' }

// Financial computations 
export const computeSummary = (transactions) => {
  const now   = new Date()
  const tm    = { start: startOfMonth(now),            end: endOfMonth(now)             }
  const lm    = { start: startOfMonth(subMonths(now,1)), end: endOfMonth(subMonths(now,1)) }

  const inRange = (t, range) => isWithinInterval(parseISO(t.date), range)
  const sum     = (arr, type) => arr.filter(t => t.type === type).reduce((a, t) => a + t.amount, 0)

  const thisMonth = transactions.filter(t => inRange(t, tm))
  const lastMonth = transactions.filter(t => inRange(t, lm))

  const totalIncome   = sum(transactions, 'income')
  const totalExpenses = sum(transactions, 'expense')
  const balance       = totalIncome - totalExpenses

  const thisIncome   = sum(thisMonth, 'income')
  const thisExpenses = sum(thisMonth, 'expense')
  const lastIncome   = sum(lastMonth, 'income')
  const lastExpenses = sum(lastMonth, 'expense')

  const pct = (curr, prev) => (prev === 0 ? 0 : (((curr - prev) / prev) * 100).toFixed(1))

  return {
    balance, totalIncome, totalExpenses,
    thisIncome, thisExpenses,
    incomeChange:   pct(thisIncome, lastIncome),
    expensesChange: pct(thisExpenses, lastExpenses),
    savingsRate: totalIncome > 0
      ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
      : 0,
  }
}

export const computeCategoryBreakdown = (transactions) => {
  const expenses = transactions.filter(t => t.type === 'expense')
  const totals   = {}
  expenses.forEach(t => { totals[t.category] = (totals[t.category] || 0) + t.amount })
  const total = Object.values(totals).reduce((a, b) => a + b, 0)
  return Object.entries(totals)
    .map(([key, value]) => ({
      key, ...getCategoryInfo(key), value,
      pct: ((value / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value)
}

// Filter + sort 
export const applyFilters = (transactions, filters) => {
  let result = [...transactions]

  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      t => t.description.toLowerCase().includes(q) ||
           getCategoryInfo(t.category).label.toLowerCase().includes(q)
    )
  }
  if (filters.type !== 'all')     result = result.filter(t => t.type === filters.type)
  if (filters.category !== 'all') result = result.filter(t => t.category === filters.category)

  result.sort((a, b) => {
    if (filters.sortBy === 'date')
      return filters.sortDir === 'desc'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    if (filters.sortBy === 'amount')
      return filters.sortDir === 'desc' ? b.amount - a.amount : a.amount - b.amount
    return 0
  })

  return result
}

// CSV Export 
export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount (₹)']
  const rows    = transactions.map(t => [
    t.date, `"${t.description}"`, getCategoryInfo(t.category).label, t.type, t.amount,
  ])
  const csv  = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = 'finvue_transactions.csv'; a.click()
  URL.revokeObjectURL(url)
}
