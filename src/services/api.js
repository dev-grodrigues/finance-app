// ============================================================
// services/api.js — Google Sheets via Stein (ou Sheet.best)
// ============================================================
// Variáveis de ambiente (configure no Netlify):
//   VITE_SHEETS_API_URL  → URL base da sua sheet (ex: https://api.steinhq.com/v1/storages/SEU_ID)
//   VITE_APP_USER        → login do usuário (ex: admin)
//   VITE_APP_PASSWORD    → senha do usuário

const BASE_URL = import.meta.env.VITE_SHEETS_API_URL

// Retorna a sheet de transações
const SHEET = `${BASE_URL}/Transacoes`

// ── GET: busca todas as transações ──────────────────────────
export async function fetchTransactions() {
  try {
    const res = await fetch(SHEET)
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)
    const data = await res.json()

    // Normaliza os dados vindos da planilha
    return data.map((row, index) => ({
      id: row.id || String(index + 1),
      descricao: row.descricao || '',
      valor: parseFloat(row.valor) || 0,
      categoria: row.categoria || 'Outros',
      data: row.data || new Date().toISOString().split('T')[0],
      tipo: row.tipo || 'despesa',  // 'receita' | 'despesa'
    }))
  } catch (err) {
    console.error('Erro ao buscar transações:', err)
    throw err
  }
}

// ── POST: adiciona nova transação ───────────────────────────
export async function addTransaction(transaction) {
  try {
    const payload = {
      id: Date.now().toString(),
      descricao: transaction.descricao,
      valor: String(transaction.valor),
      categoria: transaction.categoria,
      data: transaction.data,
      tipo: transaction.tipo,
    }

    const res = await fetch(SHEET, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([payload]),   // Stein espera um array
    })

    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)
    return payload
  } catch (err) {
    console.error('Erro ao adicionar transação:', err)
    throw err
  }
}

// ── Autenticação simples via env vars ───────────────────────
export function authenticate(usuario, senha) {
  const validUser = import.meta.env.VITE_APP_USER || 'admin'
  const validPass = import.meta.env.VITE_APP_PASSWORD || 'admin123'
  return usuario === validUser && senha === validPass
}
