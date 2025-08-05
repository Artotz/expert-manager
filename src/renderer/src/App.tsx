import { useEffect, useState } from 'react'
import { DataGrid, type Column } from 'react-data-grid'
import textEditor from './components/TextEditor'
import 'react-data-grid/lib/styles.css'
import { criarTicketsEAdicionarTags } from './service/ticketService'
// import { currentPermissions } from "@/server/api/user";

const LS_KEY = 'ticket-table-data'

type TicketRow = {
  chassi: string
  tipoContato: string
  resumo: string
  //   nome: string;
  //   sobrenome: string;
  //   email: string;
  telefone: string
  //   conta: string;
  //   idExterno: string;
}

const defaultColumns: Column<TicketRow>[] = [
  { key: 'chassi', name: 'Chassi', renderEditCell: textEditor },
  { key: 'tipoContato', name: 'Tipo de Contato', renderEditCell: textEditor },
  { key: 'resumo', name: 'Resumo', renderEditCell: textEditor },
  //   { key: "nome", name: "Nome", renderEditCell: textEditor },
  //   { key: "sobrenome", name: "Sobrenome", renderEditCell: textEditor },
  //   { key: "email", name: "Email", renderEditCell: textEditor },
  { key: 'telefone', name: 'Telefone', renderEditCell: textEditor }
  //   { key: "conta", name: "Conta", renderEditCell: textEditor },
  //   { key: "idExterno", name: "ID Externo", renderEditCell: textEditor },
]

function App() {
  const [rows, setRows] = useState<TicketRow[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY)
    if (stored) setRows(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(rows))
  }, [rows])

  function handlePaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData('text/plain')
    const lines = text.trim().split('\n')

    const newRows: TicketRow[] = lines.map((line) => {
      const [
        chassi,
        tipoContato,
        resumo,
        // nome,
        // sobrenome,
        // email,
        telefone
        // conta,
        // idExterno,
      ] = line.split('\t').map((cell) => cell.trim())

      return {
        chassi,
        tipoContato,
        resumo,
        // nome,
        // sobrenome,
        // email,
        telefone
        // conta,
        // idExterno,
      }
    })

    setRows(newRows)
  }

  function handleClear() {
    localStorage.removeItem(LS_KEY)
    setRows([])
  }

  async function handleEnviarTickets() {
    const result = await criarTicketsEAdicionarTags(rows)

    console.log(result)

    // console.log(rows);
  }

  // async function handleVerPermissoes() {
  //   try {
  //     const res = await fetch("/api/user");
  //     const data = await res.json();
  //     console.log("Permissões:", data);
  //   } catch (err) {
  //     console.error("Erro ao buscar permissões:", err);
  //   }
  // }

  // async function bruh() {
  //   try {
  //     const res = await fetch("/api/utils");
  //     const data = await res.json();
  //     console.log("Requisição:", data);
  //   } catch (err) {
  //     console.error("Erro ao criar requisição:", err);
  //   }
  // }

  return (
    <>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold">Importar e Criar Tickets</h1>

        <div onPaste={handlePaste}>
          <DataGrid
            columns={defaultColumns}
            rows={rows}
            onRowsChange={setRows}
            className="rdg-light"
            style={{ height: 500 }}
          />
        </div>

        <div className="flex gap-4">
          <button onClick={handleClear}>Limpar</button>
          <button onClick={handleEnviarTickets}>Enviar Tickets</button>
          {/* <button onClick={handleVerPermissoes}>
            Ver Permissões da Integração
          </button> */}
          {/* <button onClick={bruh}>bruh</button> */}
        </div>
      </div>
    </>
  )
}

export default App
