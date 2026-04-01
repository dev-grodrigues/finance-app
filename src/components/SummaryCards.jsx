import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency } from '../utils/formatters'

function StatCard({ icon: Icon, label, value, color, delay }) {
  return (
    <div
      className="card-hover opacity-0 animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
        >
          <Icon size={17} style={{ color }} />
        </div>
        <span className="text-xs text-ink-500 font-medium">{label}</span>
      </div>
      <p className="font-display text-2xl font-bold text-ink-50 tracking-tight">
        {formatCurrency(value)}
      </p>
    </div>
  )
}

export default function SummaryCards({ saldo, totalReceitas, totalDespesas }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        className="sm:col-span-1 card border-lime/30 glow-lime opacity-0 animate-fade-up"
        style={{ animationFillMode: 'forwards' }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-lime/15 border border-lime/25">
            <Wallet size={17} className="text-lime" />
          </div>
          <span className="text-xs text-lime/70 font-medium">Saldo Atual</span>
        </div>
        <p className="font-display text-3xl font-bold text-lime tracking-tight">
          {formatCurrency(saldo)}
        </p>
        <div className="mt-3 h-1 w-full bg-ink-700 rounded-full overflow-hidden">
          <div
            className="h-full gradient-lime rounded-full transition-all duration-1000"
            style={{
              width: `${Math.min(100, totalReceitas > 0 ? ((totalReceitas - totalDespesas) / totalReceitas) * 100 : 0)}%`,
            }}
          />
        </div>
      </div>

      <StatCard
        icon={TrendingUp}
        label="Entradas"
        value={totalReceitas}
        color="#C8FF00"
        delay={100}
      />
      <StatCard
        icon={TrendingDown}
        label="Saídas"
        value={totalDespesas}
        color="#FF5C4D"
        delay={200}
      />
    </div>
  )
}
