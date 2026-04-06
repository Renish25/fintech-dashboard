import { createSlice } from '@reduxjs/toolkit'
import { INITIAL_TRANSACTIONS } from '../../data/mockData'

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    list: INITIAL_TRANSACTIONS,
  },
  reducers: {
    addTransaction(state, action) {
      state.list.unshift(action.payload)
    },
    updateTransaction(state, action) {
      const { id, updates } = action.payload
      const idx = state.list.findIndex((t) => t.id === id)
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...updates }
    },
    deleteTransaction(state, action) {
      state.list = state.list.filter((t) => t.id !== action.payload)
    },
  },
})

export const { addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions

// ── Selectors ────────────────────────────────────────────────────────────────
export const selectAllTransactions = (state) => state.transactions.list

export default transactionsSlice.reducer
