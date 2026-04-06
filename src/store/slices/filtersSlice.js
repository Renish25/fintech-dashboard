import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search:  '',
    type:    'all',   // 'all' | 'income' | 'expense'
    category:'all',
    sortBy:  'date',  // 'date' | 'amount'
    sortDir: 'desc',  // 'asc'  | 'desc'
  },
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload
      state[key] = value
    },
    resetFilters() {
      return { search: '', type: 'all', category: 'all', sortBy: 'date', sortDir: 'desc' }
    },
  },
})

export const { setFilter, resetFilters } = filtersSlice.actions

export const selectFilters = (state) => state.filters

export default filtersSlice.reducer
