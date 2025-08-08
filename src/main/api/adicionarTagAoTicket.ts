import { getAccessToken } from './auth'

export async function adicionarTagAoTicket(
  url: string,
  tagAdicionalId: string
): Promise<
  | { success: boolean; error: any; data?: undefined }
  | { success: boolean; data: any; error?: undefined }
> {
  try {
    const token = await getAccessToken()
    //@ts-ignore sim
    const subscriptionKey = import.meta.env.VITE_API_PRIMARY_KEY!

    const response = await fetch(`https://service-api.expertconnect.deere.com${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json-patch+json',
        'Cache-Control': 'no-cache',
        'X-Subscription-Key': subscriptionKey,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        tagIds: [
          '4716c4d7-74f5-4136-b514-43a1f2fd7de1', // CF – CSC
          '2a99dab8-7692-4d49-9ca7-74a4d0e877b1', // LEAD
          'f858e157-b28c-49ad-a2f7-ab553eca97d4', // Proativo
          tagAdicionalId
        ]
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Erro ao adicionar tag:', error)
      return { success: false, error }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao adicionar tag (catch):', error)
    return { success: false, error: error.message }
  }
}
