import { Ticket } from '../../types/Ticket'
import { adicionarTagAoTicket } from '../api/adicionarTagAoTicket'
import { criarTicket } from '../api/criarTicket'

// Delay entre requisições para evitar timeouts/rate limit
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function criarTicketsEAdicionarTags(tickets: Ticket[]) {
  const results: {
    success: boolean
    error?: string
    warning?: string
  }[] = []

  for (const ticket of tickets) {
    const { success, data, error } = await criarTicket(ticket)

    if (!success) {
      results.push({
        success: false,
        error: error ?? 'Erro ao criar ticket'
      })
      continue
    }

    const url = (
      data?._links.find((link: { rel: string }) => link.rel === 'add-ticket-tags')?.href || ''
    ).replace('/api/v1.0', '/api/v1')

    try {
      await adicionarTagAoTicket(url)

      results.push({
        success: true
      })
    } catch (e) {
      results.push({
        success: true,
        warning: 'Ticket criado, mas falha ao adicionar tag'
      })
    }

    // Espera 300ms antes de criar o próximo ticket
    await delay(300)
  }

  return results
}
