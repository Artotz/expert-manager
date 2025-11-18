import { getAccessToken } from './auth'

export async function adicionarNotaAoTicket(
  url: string,
  nota: string
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
        isPrivate: false,
        text: nota,
        // mediaId: 'string',
        // latitude: 0,
        // longitude: 0,
        notificationOptions: {
          channel: 1
        }
        // scheduledDate: 'string',
        // isDraft: true
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Erro ao adicionar nota:', error)
      return { success: false, error }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error: any) {
    console.error('Erro ao adicionar nota (catch):', error)
    return { success: false, error: error.message }
  }
}
