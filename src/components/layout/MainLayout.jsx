import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeSidebar, selectDarkMode, selectSidebarOpen, toggleSidebar } from '../../store/slices/uiSlice'

import Sidebar from './Sidebar'
import Header from './Header'
import TransactionModal from '../ui/TransactionModal'

export default function MainLayout({ children }) {

    // const [sidebarOpen, setSidebarOpen] = useState(false)
    const dispatch = useDispatch()
    const darkMode = useSelector(selectDarkMode)
    const sidebarOpen = useSelector(selectSidebarOpen)


    // Sync Redux darkMode → <html class="dark"> so Tailwind dark: variants work
    useEffect(() => {
        const root = document.documentElement
        if (darkMode) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [darkMode])

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Desktop sidebar */}
            <div className="hidden lg:flex h-full">
                <Sidebar />
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
                        onClick={() => dispatch(closeSidebar())}
                    />
                    <div className="lg:hidden fixed inset-y-0 left-0 z-50 animate-slide-in">
                        <Sidebar />
                    </div>
                </>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onMenuClick={() => dispatch(toggleSidebar())} />

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>

            {/* Modals */}
            <TransactionModal />
        </div>
    )
}