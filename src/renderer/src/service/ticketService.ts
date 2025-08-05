import { adicionarTagAoTicket } from "../api/adicionarTagAoTicket";
import { criarTicket } from "../api/criarTicket";

export type Ticket = {
  chassi: string;
  tipoContato: string;
  resumo: string;
  telefone: string;
};

export async function criarTicketsEAdicionarTags(tickets: Ticket[]) {
  const results = [];

  for (const ticket of tickets) {
    const { success, data, error } = await criarTicket(ticket);

    if (!success) {
      results.push({
        success: false,
        error: error ?? "Erro ao criar ticket",
      });
      continue;
    }

    const url = (
      data?._links.find(
        (link: { rel: string }) => link.rel === "add-ticket-tags"
      )?.href || ""
    ).replace("/api/v1.0", "/api/v1");

    console.log(url);

    await adicionarTagAoTicket(url);
    results.push({
      success: true,
      // id: ticketId,
    });
    results.push({
      success: true,
      // id: ticketId,
      warning: "Ticket criado, mas falha ao adicionar tag",
    });
  }

  return results;
}
