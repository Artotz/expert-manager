export type Ticket = {
  chassi: string
  tipoContato: string
  resumo: string
  horimetro: string
  empresa: string
  telefone: string
  advisorId: string
}

export type Lead = {
  Tipo:
    | 'LEAD TRANSFERÊNCIA'
    | 'LEAD RECONEXÃO'
    | 'LEAD DISPONIBILIDADE'
    | 'LEAD RODANTE'
    | 'LEAD LÂMINA'
    | 'LEAD DENTES'
    | 'LEAD REFORMA DE COMPONENTES'
    | 'LEAD GARANTIA ESTENDIDA'
    | 'LEAD GARANTIA BÁSICA'
    | 'LEAD CORRETIVA'
    | 'LEAD PREVENTIVA'
}
