import { useState, useEffect } from 'react'
import { fetchTransactions, addTransaction } from '../services/api'

export function useFinance() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTransactions()
      setTransactions(data)
    } catch (err) {
      setError('Não foi possível carregar as transações.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, []) // roda uma vez ao montar o componente

  const add = async (transaction) => {
    setSaving(true)
    try {
      const saved = await addTransaction(transaction)
      await load() // recarrega tudo do Sheets após salvar
      return { success: true }
    } catch (err) {
      return { success: false, error: 'Erro ao salvar transação.' }
    } finally {
      setSaving(false)
    }
  }

  const totalReceitas = transactions
    .filter((t) => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0)

  const totalDespesas = transactions
    .filter((t) => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0)

  const saldo = totalReceitas - totalDespesas

  const gastosPorCategoria = transactions
    .filter((t) => t.tipo === 'despesa')
    .reduce((acc, t) => {
      acc[t.categoria] = (acc[t.categoria] || 0) + t.valor
      return acc
    }, {})

  const categoriaData = Object.entries(gastosPorCategoria).map(([name, value]) => ({
    name,
    value,
  }))

  const fluxoMensal = (() => {
    const months = {}
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      const label = d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })
      months[key] = { mes: label, receitas: 0, despesas: 0 }
    }
    transactions.forEach((t) => {
      const key = t.data?.slice(0, 7)
      if (months[key]) {
        if (t.tipo === 'receita') months[key].receitas += t.valor
        else months[key].despesas += t.valor
      }
    })
    return Object.values(months)
  })()

  return {
    transactions,
    loading,
    error,
    saving,
    add,
    reload: load,
    totalReceitas,
    totalDespesas,
    saldo,
    categoriaData,
    fluxoMensal,
  }
}