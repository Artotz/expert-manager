import { Ticket } from '../../types/Ticket'
import { getAccessToken } from './auth'

export async function criarTicket(ticket: Ticket) {
  try {
    const token = await getAccessToken()

    //@ts-ignore criar interface para o env dps
    const companyId = import.meta.env.VITE_COMPANY_ID!
    //@ts-ignore bruh
    const subscriptionKey = import.meta.env.VITE_API_PRIMARY_KEY!

    const cscId = 'a3f45e21-7403-4c92-aae7-ec1c1048ef59'
    // const cscR1Id = "ab83891b-b552-4781-aee7-d3d65bac02b5"
    // const cscR2Id = "5a5c5440-cd19-46b6-b2bd-cb479802de96"
    // const cscR3Id = '15b083d9-0d86-460c-aea4-0ef6a6191963'

    // const idConsultorBreno = 'a329002a-70c7-478d-b936-bf978d86338f'
    // const idConsultorGlaucia = '2aa20af6-dbb8-4ca8-8a5a-5a7fe24f52b1'
    // const idConsultorJulio = '7eba9912-5b9e-40af-9479-00dddda04519'

    const title = `${ticket.chassi} - ${ticket.tipoContato} - ${ticket.resumo}`
    // const description = `Empresa: ${ticket.empresa}`
    const description = `Nossa telemetria encontrou uma oportunidade de ${ticket.resumo} para o equipamento com chassi ${ticket.chassi} (${ticket.horimetro}h), da empresa ${ticket.empresa}.`
    const productNote = ticket.chassi.slice(3, 7)

    // {
    //   title: 'string',
    //   description: 'string',
    //   customerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    //   customer: {
    //     phone: {
    //       number: 'string',
    //       countryCode: 0,
    //       iso2CountryCode: 'st'
    //     },
    //     email: 'user@example.com'
    //   },
    //   misc: 'string',
    //   resolution: 'string',
    //   teamId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    //   advisorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    //   notificationOptions: {
    //     channel: 0
    //   },
    //   priority: 0,
    //   webhookIds: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
    //   fields: [
    //     {
    //       definitionId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    //       value: 'string'
    //     }
    //   ],
    //   support: 0,
    //   emailParticipants: [
    //     {
    //       email: 'user@example.com',
    //       emailCopyType: 0
    //     }
    //   ],
    //   machines: [
    //     {
    //       serialNumber: 'string',
    //       productNote: 'string',
    //       details: [
    //         {
    //           machineHours: 'string'
    //         }
    //       ]
    //     }
    //   ]
    // }

    const payload = {
      title: title,
      description: description,
      customer: {
        phone: {
          number: ticket.telefone,
          countryCode: 6
        }
      },
      teamId: cscId,
      advisorId: ticket.advisorId,
      machines: [
        {
          serialNumber: ticket.chassi,
          productNote: productNote,
          details: [
            {
              machineHours: ticket.horimetro
            }
          ]
        }
      ]
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
