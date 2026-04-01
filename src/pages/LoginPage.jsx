import { useState } from 'react'
import { TrendingUp, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { authenticate } from '../services/api'

export default function LoginPage({ onLogin }) {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600)) // animação de feedback
    const ok = authenticate(usuario.trim(), senha)
    if (ok) {
      onLogin()
    } else {
      setError('Usuário ou senha incorretos.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen noise-bg flex flex-col items-center justify-center p-5 bg-ink">
      {/* Glow decorativo */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-lime/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm animate-fade-up">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 gradient-lime rounded-xl flex items-center justify-center glow-lime">
            <TrendingUp size={20} className="text-ink" />
          </div>
          <span className="font-display text-2xl font-extrabold text-ink-50 tracking-tight">
            Finanças<span className="text-lime">PRO</span>
          </span>
        </div>

        <div className="card border-ink-700 glow-lime">
          <h1 className="font-display text-xl font-bold text-ink-50 mb-1">Bem-vindo de volta</h1>
          <p className="text-sm text-ink-400 mb-7">Acesse o painel financeiro</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Usuário */}
            <div>
              <label className="label">Usuário</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="seu-usuario"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="label">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-200 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="flex items-center gap-2 text-coral text-sm bg-coral/10 border border-coral/20 rounded-xl p-3 animate-fade-in">
                <AlertCircle size={15} />
                {error}
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-pulse-soft">Entrando...</span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-ink-500 mt-6">
          Credenciais configuradas via variáveis de ambiente
        </p>
      </div>
    </div>
  )
}
