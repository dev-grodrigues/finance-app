import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import TransactionsPage from './pages/TransactionsPage'
import Navbar from './components/Navbar'
import { useFinance } from './hooks/useFinance'

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('auth') === 'true'
  )
  const [page, setPage] = useState('dashboard')
  const finance = useFinance()

  const handleLogin = () => {
    sessionStorage.setItem('auth', 'true')
    setAuthenticated(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('auth')
    setAuthenticated(false)
  }

  if (!authenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen noise-bg bg-ink">
      {/* Glow de fundo decorativo */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full bg-lime/3 blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sky/3 blur-3xl pointer-events-none" />

      <Navbar page={page} setPage={setPage} onLogout={handleLogout} />

      <main className="max-w-5xl mx-auto px-4 py-6 relative z-10">
        {page === 'dashboard' ? (
          <Dashboard finance={finance} />
        ) : (
          <TransactionsPage finance={finance} />
        )}
      </main>
    </div>
  )
}
