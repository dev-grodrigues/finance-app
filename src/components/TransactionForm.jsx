import { useState } from 'react'
import { Plus, X, CheckCircle2, AlertCircle } from 'lucide-react'
import { CATEGORIAS } from '../utils/formatters'

const INITIAL = {
  descricao: '',
  valor: '',
  categoria: '',
  data: new Date().toISOString().split('T')[0],
  tipo: 'despesa',
}

export default function TransactionForm({ onAdd, saving }) {
  const [form, setForm] = useState(INITIAL)
  const [feedback, setFeedback] = useState(null) // 'success' | 'error'

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.descricao || !form.valor || !form.categoria) return

    const result = await onAdd({
      ...form,
      valor: parseFloat(form.valor.replace(',', '.')),
    })

    if (result.success) {
      setFeedback('success')
      setForm(INITIAL)
    } else {
      setFeedback('error')
    }

    setTimeout(() => setFeedback(null), 3000)
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-base font-bold text-ink-100">Nova Transação</h3>
        <div className="w-7 h-7 rounded-lg bg-lime/10 border border-lime/20 flex items-center justify-center">
          <Plus size={14} className="text-lime" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo (toggle) */}
        <div>
          <label className="label">Tipo</label>
          <div className="flex gap-2">
            {['despesa', 'receita'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set('tipo', t)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  form.tipo === t
                    ? t === 'receita'
                      ? 'bg-lime/15 text-lime border border-lime/30'
                      : 'bg-coral/15 text-coral border border-coral/30'
                    : 'bg-ink-700 text-ink-400 border border-ink-600 hover:border-ink-500'
                }`}
              >
                {t === 'receita' ? '↑ Receita' : '↓ Despesa'}
              </button>
            ))}
          </div>
        </div>

        {/* Descrição */}
        <div>
          <label className="label">Descrição</label>
          <input
            type="text"
            value={form.descricao}
            onChange={(e) => set('descricao', e.target.value)}
            placeholder="Ex: Supermercado, Salário..."
            required
            className="input-field"
          />
        </div>

        {/* Valor */}
        <div>
          <label className="label">Valor (R$)</label>
          <input
            type="number"
            value={form.valor}
            onChange={(e) => set('valor', e.target.value)}
            placeholder="0,00"
            min="0"
            step="0.01"
            required
            className="input-field font-mono"
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="label">Categoria</label>
          <select
            value={form.categoria}
            onChange={(e) => set('categoria', e.target.value)}
            required
            className="input-field"
          >
            <option value="">Selecione...</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Data */}
        <div>
          <label className="label">Data</label>
          <input
            type="date"
            value={form.data}
            onChange={(e) => set('data', e.target.value)}
            required
            className="input-field"
          />
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`flex items-center gap-2 text-sm rounded-xl p-3 animate-fade-in ${
              feedback === 'success'
                ? 'bg-lime/10 text-lime border border-lime/20'
                : 'bg-coral/10 text-coral border border-coral/20'
            }`}
          >
            {feedback === 'success' ? (
              <>
                <CheckCircle2 size={15} /> Transação salva com sucesso!
              </>
            ) : (
              <>
                <AlertCircle size={15} /> Erro ao salvar. Tente novamente.
              </>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? (
            <span className="animate-pulse-soft">Salvando...</span>
          ) : (
            <>
              <Plus size={16} /> Adicionar Transação
            </>
          )}
        </button>
      </form>
    </div>
  )
}
