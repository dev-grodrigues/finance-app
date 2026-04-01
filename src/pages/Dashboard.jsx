import SummaryCards from '../components/SummaryCards'
import { PieChartCard, BarChartCard } from '../components/Charts'
import TransactionList from '../components/TransactionList'
import { AlertCircle } from 'lucide-react'

export default function Dashboard({ finance }) {
  const {
    transactions, loading, error,
    saldo, totalReceitas, totalDespesas,
    categoriaData, fluxoMensal, reload,
  } = finance

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card text-center max-w-sm">
          <AlertCircle size={40} className="text-coral mx-auto mb-3" />
          <p className="text-ink-200 font-medium mb-1">Erro de conexão</p>
          <p className="text-sm text-ink-400 mb-5">{error}</p>
          <button onClick={reload} className="btn-primary justify-center">
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink-50 mb-1 tracking-tight">
          Dashboard
        </h2>
        <p className="text-sm text-ink-400">Visão geral das suas finanças</p>
      </div>

      <SummaryCards saldo={saldo} totalReceitas={totalReceitas} totalDespesas={totalDespesas} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="opacity-0 animate-fade-up animate-delay-300" style={{ animationFillMode: 'forwards' }}>
          <PieChartCard data={categoriaData} />
        </div>
        <div className="opacity-0 animate-fade-up animate-delay-400" style={{ animationFillMode: 'forwards' }}>
          <BarChartCard data={fluxoMensal} />
        </div>
      </div>

      <div className="opacity-0 animate-fade-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
        <TransactionList
          transactions={transactions.slice(0, 8)}
          loading={loading}
          onReload={reload}
        />
      </div>
    </div>
  )
}
