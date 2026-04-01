import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts'
import { CATEGORY_COLORS, formatCurrency } from '../utils/formatters'

const CustomTooltipPie = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-ink-700 border border-ink-600 rounded-xl p-3 text-sm shadow-xl">
        <p className="text-ink-200 font-medium">{payload[0].name}</p>
        <p className="text-lime font-bold">{formatCurrency(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

const CustomTooltipBar = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-ink-700 border border-ink-600 rounded-xl p-3 text-sm shadow-xl">
        <p className="text-ink-300 text-xs mb-2">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="font-medium">
            {p.name === 'receitas' ? 'Receitas' : 'Despesas'}: {formatCurrency(p.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function PieChartCard({ data }) {
  if (!data.length) {
    return (
      <div className="card flex flex-col items-center justify-center h-64 text-ink-500 text-sm">
        <p>Nenhuma despesa registrada</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="font-display text-base font-bold text-ink-100 mb-5">
        Gastos por Categoria
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                strokeWidth={0}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltipPie />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legenda customizada */}
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {data.slice(0, 6).map((item, i) => (
          <div key={item.name} className="flex items-center gap-2 text-xs">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}
            />
            <span className="text-ink-400 truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BarChartCard({ data }) {
  return (
    <div className="card">
      <h3 className="font-display text-base font-bold text-ink-100 mb-5">
        Fluxo Mensal
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={12} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2E2E28" vertical={false} />
          <XAxis
            dataKey="mes"
            tick={{ fill: '#707065', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#707065', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `R$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
            width={45}
          />
          <Tooltip content={<CustomTooltipBar />} cursor={{ fill: '#1A1A16' }} />
          <Bar dataKey="receitas" fill="#C8FF00" radius={[4, 4, 0, 0]} />
          <Bar dataKey="despesas" fill="#FF5C4D" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex gap-5 mt-3">
        <div className="flex items-center gap-1.5 text-xs text-ink-400">
          <div className="w-2 h-2 rounded-full bg-lime" /> Receitas
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ink-400">
          <div className="w-2 h-2 rounded-full bg-coral" /> Despesas
        </div>
      </div>
    </div>
  )
}
