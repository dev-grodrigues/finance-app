import { formatCurrency, formatDate } from '../utils/formatters'
import { ArrowUpCircle, ArrowDownCircle, RefreshCw, Inbox } from 'lucide-react'

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-ink-800 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-ink-700" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 bg-ink-700 rounded w-2/5" />
        <div className="h-2.5 bg-ink-800 rounded w-1/4" />
      </div>
      <div className="h-4 bg-ink-700 rounded w-16" />
    </div>
  )
}

export default function TransactionList({ transactions, loading, onReload }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-base font-bold text-ink-100">Lançamentos</h3>
        <button onClick={onReload} className="btn-ghost text-xs py-1.5 px-3">
          <RefreshCw size={13} />
          Atualizar
        </button>
      </div>

      {loading ? (
        <div className="space-y-0">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-ink-500">
          <Inbox size={36} className="mb-3 opacity-40" />
          <p className="text-sm">Nenhuma transação registrada</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-800">
                <th className="text-left text-xs text-ink-500 font-medium uppercase tracking-wider pb-3 px-5">
                  Descrição
                </th>
                <th className="text-left text-xs text-ink-500 font-medium uppercase tracking-wider pb-3 hidden sm:table-cell">
                  Categoria
                </th>
                <th className="text-left text-xs text-ink-500 font-medium uppercase tracking-wider pb-3 hidden md:table-cell">
                  Data
                </th>
                <th className="text-right text-xs text-ink-500 font-medium uppercase tracking-wider pb-3 px-5">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 20).map((t, idx) => (
                <tr
                  key={t.id || idx}
                  className="border-b border-ink-800/60 hover:bg-ink-700/30 transition-colors"
                  style={{
                    opacity: 0,
                    animation: `fadeUp 0.3s ease ${idx * 40}ms forwards`,
                  }}
                >
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          t.tipo === 'receita' ? 'bg-lime/10' : 'bg-coral/10'
                        }`}
                      >
                        {t.tipo === 'receita' ? (
                          <ArrowUpCircle size={14} className="text-lime" />
                        ) : (
                          <ArrowDownCircle size={14} className="text-coral" />
                        )}
                      </div>
                      <span className="text-ink-200 font-medium truncate max-w-[140px]">
                        {t.descricao}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 hidden sm:table-cell">
                    <span
                      className={t.tipo === 'receita' ? 'tag-income' : 'tag-expense'}
                    >
                      {t.categoria}
                    </span>
                  </td>
                  <td className="py-3.5 text-ink-500 text-xs hidden md:table-cell">
                    {formatDate(t.data)}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span
                      className={`font-mono font-semibold ${
                        t.tipo === 'receita' ? 'text-lime' : 'text-coral'
                      }`}
                    >
                      {t.tipo === 'despesa' ? '−' : '+'}
                      {formatCurrency(t.valor)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
