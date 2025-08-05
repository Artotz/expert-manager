let cachedToken: string | null = null
let tokenExpiry = 0

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken

  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')
  params.append('client_id', import.meta.env.VITE_CLIENT_ID!)
  params.append('client_secret', import.meta.env.VITE_CLIENT_SECRET!)
  params.append('scope', 'ec.partnerapi.client.read ec.partnerapi.client.write')

  console.log(import.meta.env.VITE_AUTH_URL!)

  const response = await fetch(import.meta.env.VITE_AUTH_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Erro ao obter token: ${error.error_description || error.message}`)
  }

  const data = await response.json()
  cachedToken = data.access_token
  tokenExpiry = Date.now() + data.expires_in * 1000 - 10000

  return cachedToken!
}
