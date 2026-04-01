import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'

export default function TransactionsPage({ finance }) {
  const { transactions, loading, saving, add, reload } = finance

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink-50 mb-1 tracking-tight">
          Lançamentos
        </h2>
        <p className="text-sm text-ink-400">Registre e gerencie suas transações</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          <TransactionForm onAdd={add} saving={saving} />
        </div>
        <div className="lg:col-span-3 opacity-0 animate-fade-up animate-delay-100" style={{ animationFillMode: 'forwards' }}>
          <TransactionList transactions={transactions} loading={loading} onReload={reload} />
        </div>
      </div>
    </div>
  )
}
