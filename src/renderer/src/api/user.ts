import { getAccessToken } from "./auth";

export async function currentPermissions() {
  try {
    const token = await getAccessToken();

    // const companyId = import.meta.env.VITE_COMPANY_ID!;
    const subscriptionKey = import.meta.env.VITE_API_PRIMARY_KEY!;

    const response = await fetch(
      `https://service-api.expertconnect.deere.com/api/v1/integrations/current`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          "X-Subscription-Key": subscriptionKey,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        error: "Erro ao buscar dados",
        details: data,
        status: response.status,
      };
    }

    return data;
  } catch (error: any) {
    return {
      error: "Erro inesperado ao buscar dados",
      details: error.message || error,
    };
  }
}
