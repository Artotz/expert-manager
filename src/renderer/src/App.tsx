import { useEffect, useState } from 'react'
import { DataGrid, type Column } from 'react-data-grid'
import textEditor from './components/TextEditor'
import 'react-data-grid/lib/styles.css'
import { Ticket } from 'src/types/Ticket'
// import './assets/main.css'

// import { currentPermissions } from "@/server/api/user";

const LS_KEY = 'ticket-table-data'

const defaultColumns: Column<Ticket>[] = [
  { key: 'chassi', name: 'Chassi', renderEditCell: textEditor },
  { key: 'tipoContato', name: 'Tipo de Contato', renderEditCell: textEditor },
  { key: 'resumo', name: 'Resumo', renderEditCell: textEditor },
  { key: 'horimetro', name: 'Horímetro', renderEditCell: textEditor },
  { key: 'empresa', name: 'Empresa', renderEditCell: textEditor },
  { key: 'telefone', name: 'Telefone', renderEditCell: textEditor },
  { key: 'advisorId', name: 'Consultor', renderEditCell: textEditor }
]

function App() {
  const [rows, setRows] = useState<Ticket[]>([])

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

    const newRows: Ticket[] = lines.map((line) => {
      const [
        chassi,
        tipoContato,
        resumo,
        horimetro,
        empresa,
        telefone,
        advisorId // bruhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
      ] = line.split('\t').map((cell) => cell.trim())

      return {
        chassi,
        tipoContato,
        resumo,
        horimetro,
        empresa,
        telefone,
        advisorId
      }
    })

    setRows(newRows)
  }

  function handleClear() {
    localStorage.removeItem(LS_KEY)
    setRows([])
  }

  async function handleEnviarTickets() {
    const result = await window.api.criarTicketsEAdicionarTags(rows)

    console.log('resultado: ', result)

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
      <div className="grid-container">
        <h1>Importar e Criar Tickets</h1>

        <div onPaste={handlePaste}>
          <DataGrid
            columns={defaultColumns}
            rows={rows}
            onRowsChange={setRows}
            className="rdg-light"
            style={{ height: 500 }}
          />
        </div>

        <div>
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
