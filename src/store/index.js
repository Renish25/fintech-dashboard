import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import transactionsReducer from './slices/transactionsSlice'
import filtersReducer      from './slices/filtersSlice'
import uiReducer           from './slices/uiSlice'

// ── Persist config ────────────────────────────────────────────────────────────
// Only persist transactions and ui.role / ui.darkMode; filters reset each session
const persistConfig = {
  key:       'finvue-root',
  storage,
  whitelist: ['transactions', 'ui'],
}

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  filters:      filtersReducer,
  ui:           uiReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// ── Store ─────────────────────────────────────────────────────────────────────
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
