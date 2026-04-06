import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout children={<Dashboard />} />} />
            <Route path="/transactions" element={<MainLayout children={<Transactions />} />} />
            <Route path="/insights" element={<MainLayout children={<Insights />} />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}