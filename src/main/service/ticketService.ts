import { enviarResultadoParaRenderer } from '..'
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

  const leads = [
    {
      id: 'b40fa0cf-5eea-4762-bb21-4502d3f00e27',
      name: 'LEAD TRANSFERÊNCIA'
    },
    {
      id: '867d0d1f-277f-47ed-b0b6-17c5bdc47645',
      name: 'LEAD RECONEXÃO'
    },
    {
      id: 'a0ca4bb5-a2f9-403a-adc4-691f375bc6d4',
      name: 'LEAD DISPONIBILIDADE'
    },
    {
      id: 'db235112-1eab-4323-9559-cb256ccc3b45',
      name: 'LEAD RODANTE'
    },
    {
      id: 'd6878fe0-a783-4279-a986-28e0b5ec0e71',
      name: 'LEAD LÂMINA'
    },
    {
      id: 'd3b0d1c0-0071-498f-b825-cae442ea4b1f',
      name: 'LEAD DENTES'
    },
    {
      id: 'a2f7bf94-33b1-4a9c-b563-9404ee8766be',
      name: 'LEAD REFORMA DE COMPONENTES'
    },
    {
      id: '83fc6fc5-bd4b-46d9-ad38-a414e90bf512',
      name: 'LEAD GARANTIA ESTENDIDA'
    },
    {
      id: 'ebb7fc84-d810-4fda-904e-bb508cf542fe',
      name: 'LEAD GARANTIA BÁSICA'
    },
    {
      id: '7d7d06a8-77bf-42a0-96f9-4972644f0f7a',
      name: 'LEAD CORRETIVA'
    },
    {
      id: '6501bd24-cdd3-49e4-9c92-254cf1b54ce7',
      name: 'LEAD PREVENTIVA'
    }
  ]

  const leadTipos = [
    'LEAD TRANSFERÊNCIA',
    'LEAD RECONEXÃO',
    'LEAD DISPONIBILIDADE',
    'LEAD RODANTE',
    'LEAD LÂMINA',
    'LEAD DENTES',
    'LEAD REFORMA DE COMPONENTES',
    'LEAD GARANTIA ESTENDIDA',
    'LEAD GARANTIA BÁSICA',
    'LEAD CORRETIVA',
    'LEAD PREVENTIVA'
  ]

  function getLeadIdByName(name: string): string | undefined {
    return leads.find((lead) => lead.name === name)?.id
  }

  for (const ticket of tickets) {
    if (!leadTipos.includes(ticket.resumo)) {
      results.push({
        success: false
      })

      enviarResultadoParaRenderer({ ticket: ticket, success: false })

      continue
    }

    const { success, data, error } = await criarTicket(ticket)

    if (!success) {
      results.push({
        success: false,
        error: error ?? 'Erro ao criar ticket'
      })

      enviarResultadoParaRenderer({ ticket: ticket, success: false })

      continue
    }

    const url = (
      data?._links.find((link: { rel: string }) => link.rel === 'add-ticket-tags')?.href || ''
    ).replace('/api/v1.0', '/api/v1')

    try {
      await adicionarTagAoTicket(url, getLeadIdByName(ticket.resumo)!)

      results.push({
        success: true
      })

      enviarResultadoParaRenderer({ ticket: ticket, success: true })
    } catch (e: any) {
      results.push({
        success: true,
        error: e.message,
        warning: 'Ticket criado, mas falha ao adicionar tag'
      })

      enviarResultadoParaRenderer({
        ticket: ticket,
        success: true,
        index: tickets.indexOf(ticket),
        warning: 'Ticket criado, mas falha ao adicionar tag'
      })
    }

    // Espera 300ms antes de criar o próximo ticket
    await delay(300)
  }

  // for (let i = 0; i < tickets.length; i++) {
  //   enviarResultadoParaRenderer({ success: false, index: i })
  //   await delay(300)
  // }

  return results
}
