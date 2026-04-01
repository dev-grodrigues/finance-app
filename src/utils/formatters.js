export const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)

export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

export const CATEGORIAS = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Vestuário',
  'Serviços',
  'Investimentos',
  'Salário',
  'Freelance',
  'Outros',
]

export const CATEGORY_COLORS = [
  '#C8FF00',
  '#FF5C4D',
  '#4DAAFF',
  '#FFB347',
  '#BB86FC',
  '#00E5CC',
  '#FF79C6',
  '#50FA7B',
  '#F1FA8C',
  '#8BE9FD',
  '#BD93F9',
  '#6272A4',
]
