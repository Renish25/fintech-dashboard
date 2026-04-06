# Finvue — Finance Dashboard

A clean, interactive finance dashboard built with **React + Vite + Tailwind CSS + Redux Toolkit**.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Redux Toolkit | Global state management |
| redux-persist | Persist state to localStorage |
| Recharts | Charts (Area, Bar, Donut) |
| lucide-react | Icons |
| date-fns | Date formatting & arithmetic |
| clsx | Conditional classNames |

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

---

## Project Structure

```
src/
├── store/
│   ├── index.js                  ← configureStore + redux-persist
│   └── slices/
│       ├── transactionsSlice.js  ← add / update / delete transactions
│       ├── filtersSlice.js       ← search, type, category, sort
│       └── uiSlice.js            ← role, activePage, darkMode, modal
├── data/
│   └── mockData.js               ← 40 mock transactions + monthly chart data
├── utils/
│   └── helpers.js                ← formatCurrency, computeSummary, applyFilters, exportCSV
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx           ← navigation, role selector, dark mode toggle
│   │   └── Header.jsx            ← page title, Add Transaction button
│   ├── charts/
│   │   ├── BalanceTrendChart.jsx ← 6-month area chart
│   │   ├── SpendingBreakdown.jsx ← donut chart + category bars
│   │   └── MonthlyComparisonChart.jsx ← grouped bar chart
│   └── ui/
│       ├── SummaryCards.jsx      ← Balance, Income, Expenses, Savings Rate
│       ├── RecentTransactions.jsx
│       ├── TransactionRow.jsx    ← single row with edit/delete (admin only)
│       ├── FiltersBar.jsx        ← search + type + category + sort + export
│       └── TransactionModal.jsx  ← add/edit modal with validation
└── pages/
    ├── Dashboard.jsx
    ├── Transactions.jsx
    └── Insights.jsx
```

---

## Features

### Dashboard
- Summary cards: Total Balance, Income, Expenses, Savings Rate with MoM % change
- 6-month balance trend (area chart)
- Spending breakdown by category (donut + bar list)
- Recent 6 transactions with quick "View all" link

### Transactions
- Full list with search, type filter, category filter, sort by date/amount
- Per-row Edit & Delete (admin only, revealed on hover)
- CSV export of filtered results
- Empty state handling

### Insights
- Top spending category, savings rate health check
- Income & expense change vs last month
- Monthly income vs expenses bar chart
- Full category breakdown with animated progress bars
- Data-driven smart tips (generated from your actual numbers)

### Role-Based UI
- **Admin**: can add, edit, delete transactions; "Add Transaction" button visible
- **Viewer**: read-only; edit/delete buttons hidden; Add button hidden
- Switch roles instantly from the sidebar dropdown

### Extras
- Dark mode toggle (persisted)
- `redux-persist` — transactions and role survive page refresh
- Responsive layout — hamburger menu on mobile
- Staggered fade-up animations throughout
- Form validation in the Add/Edit modal

---

## Redux Architecture

```
store
├── transactions   { list: Transaction[] }
├── filters        { search, type, category, sortBy, sortDir }
└── ui             { role, activePage, darkMode, modal, modalData }
```

All state is accessed via `useSelector` and mutated via `useDispatch` + action creators — no prop drilling anywhere.

`redux-persist` whitelists `transactions` and `ui` slices to localStorage; `filters` are intentionally ephemeral (reset on refresh).

---

## Assumptions

- Amounts are in Indian Rupees (₹)
- "This month" comparisons use the current calendar month
- No backend — all data is mock / in-browser
- Admin/Viewer role switching is for UI demonstration only (no auth)
