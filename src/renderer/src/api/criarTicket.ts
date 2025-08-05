// server/api/criarTicket.ts
import type { Ticket } from '../service/ticketService'
import { getAccessToken } from './auth'

export async function criarTicket(ticket: Ticket) {
  try {
    const token = await getAccessToken()

    const companyId = import.meta.env.VITE_COMPANY_ID!
    const subscriptionKey = import.meta.env.VITE_API_PRIMARY_KEY!

    // const cscId = "a3f45e21-7403-4c92-aae7-ec1c1048ef59";
    const cscR3Id = '15b083d9-0d86-460c-aea4-0ef6a6191963'

    const title = `${ticket.chassi} - ${ticket.tipoContato} - ${ticket.resumo}`

    const payload = {
      title,
      description: ticket.resumo,
      customer: {
        phone: {
          number: ticket.telefone,
          countryCode: 6
        }
      },
      teamId: cscR3Id
    }

    const response = await fetch(
      `https://service-api.expertconnect.deere.com/api/v1/companies/${companyId}/tickets`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json-patch+json',
          'Cache-Control': 'no-cache',
          'X-Subscription-Key': subscriptionKey,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Erro em criar Ticket:', response.status, data)
      return { success: false, error: data, status: response.status }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Erro inesperado em criar Ticket:', error)
    return { success: false, error: error.message || error }
  }
}
