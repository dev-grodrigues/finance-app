import { TrendingUp, LogOut, LayoutDashboard, List } from 'lucide-react'

export default function Navbar({ page, setPage, onLogout }) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-900/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 gradient-lime rounded-lg flex items-center justify-center">
            <TrendingUp size={14} className="text-ink" />
          </div>
          <span className="font-display text-lg font-extrabold text-ink-50 tracking-tight hidden sm:block">
            Finanças<span className="text-lime">PRO</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <button
            onClick={() => setPage('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              page === 'dashboard'
                ? 'bg-ink-700 text-ink-50'
                : 'text-ink-400 hover:text-ink-200'
            }`}
          >
            <LayoutDashboard size={14} />
            <span className="hidden sm:block">Dashboard</span>
          </button>
          <button
            onClick={() => setPage('transactions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              page === 'transactions'
                ? 'bg-ink-700 text-ink-50'
                : 'text-ink-400 hover:text-ink-200'
            }`}
          >
            <List size={14} />
            <span className="hidden sm:block">Lançamentos</span>
          </button>
        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="btn-ghost text-xs py-1.5 px-3 text-ink-500"
        >
          <LogOut size={14} />
          <span className="hidden sm:block">Sair</span>
        </button>
      </div>
    </header>
  )
}
