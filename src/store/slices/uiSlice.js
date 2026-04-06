import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    role:       'admin',     // 'admin' | 'viewer'
    activePage: 'dashboard', // 'dashboard' | 'transactions' | 'insights'
    darkMode:   true,
    sidebarOpen:   true,
    modal:      null,        // null | 'add' | 'edit'
    modalData:  null,        // transaction object when editing
  },
  reducers: {
    setRole(state, action)        { state.role = action.payload },
    setActivePage(state, action)  { state.activePage = action.payload },
    toggleDarkMode(state)         { state.darkMode = !state.darkMode },
    toggleSidebar(state)          { state.sidebarOpen = !state.sidebarOpen },
    closeSidebar(state)           { state.sidebarOpen = false },
    openModal(state, action) {
      state.modal     = action.payload.type
      state.modalData = action.payload.data ?? null
    },
    closeModal(state) {
      state.modal     = null
      state.modalData = null
    },
  },
})

export const {
  setRole, setActivePage, toggleDarkMode, toggleSidebar, closeSidebar, openModal, closeModal,
} = uiSlice.actions

// Selectors
export const selectRole       = (state) => state.ui.role
export const selectActivePage = (state) => state.ui.activePage
export const selectDarkMode   = (state) => state.ui.darkMode
export const selectSidebarOpen = (state) => state.ui.sidebarOpen
export const selectModal      = (state) => state.ui.modal
export const selectModalData  = (state) => state.ui.modalData

export default uiSlice.reducer
