import { useEffect, useState } from 'react'
import {
  Cell,
  CellRendererProps,
  DataGrid,
  RenderRowProps,
  Row,
  type Column
} from 'react-data-grid'
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

function App() {
  const [rows, setRows] = useState<Ticket[]>([])
  const [progress, setProgress] = useState<string[]>([])
  const [isRequestOngoing, setIsRequestOngoing] = useState<boolean>(false)
  const [confirmLimparTabela, setConfirmLimparTabela] = useState<boolean>(false)

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY)
    if (stored) setRows(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(rows))
  }, [rows])

  useEffect(() => {
    window.api.onTicketProgress((result) => {
      if (result.success) {
        if (result.warning != null) setProgress((prev) => [...prev, 'ticket-warning'])
        else setProgress((prev) => [...prev, 'ticket-success'])
      } else setProgress((prev) => [...prev, 'ticket-failure'])
    })
  }, [])

  function checkProgress(index: number) {
    if (index > progress.length - 1) return ''
    else return progress[index] || ''
  }

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

    setProgress([])

    setRows(newRows)
  }

  function handleClear() {
    localStorage.removeItem(LS_KEY)
    setProgress([])

    setRows([])

    setConfirmLimparTabela(false)
  }

  async function handleEnviarTickets() {
    setIsRequestOngoing(true)

    const result = await window.api.criarTicketsEAdicionarTags(rows)

    console.log('resultado: ', result)
    setIsRequestOngoing(false)
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

  const cellStyle: React.CSSProperties = { backgroundColor: 'red' }

  //@ts-ignore é um type, aceite
  function renderCell(key: React.Key, props: CellRendererProps<Row, unknown>) {
    const style =
      // eslint-disable-next-line react/prop-types
      props.column.key === 'resumo' && !leadTipos.includes(props.row.resumo) ? cellStyle : undefined

    return <Cell key={key} style={style} {...props} />
  }

  // const rowStyle: React.CSSProperties = { color: 'green' }

  //@ts-ignore é um type, aceite
  function renderRow(key: React.Key, props: RenderRowProps<Row>) {
    // let style: React.CSSProperties = {}

    // // eslint-disable-next-line react/prop-types
    // if (props.row.resumo != 'LEAD PREVENTIVA') style = { backgroundColor: 'red' }

    let rowProgress = {}

    // eslint-disable-next-line react/prop-types
    switch (checkProgress(props.rowIdx)) {
      case 'ticket-success':
        rowProgress = {
          backgroundColor: 'green'
        }
        break

      case 'ticket-warning':
        rowProgress = {
          backgroundColor: 'yellow'
        }
        break

      case 'ticket-failure':
        rowProgress = {
          backgroundColor: 'red'
        }
        break
    }

    console.log(rowProgress)

    // return <Row key={key} style={style} {...props} />
    return <Row key={key} style={rowProgress} {...props} />
  }

  // function rowKeyGetter(row: Row) {
  //   return row.id
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
            renderers={{ renderCell, renderRow }}
            //@ts-ignore como que eu pego só o index ??
            // rowClass={(row, index) => {
            //   return `${checkProgress(index)}`
            // }}
          />
        </div>

        <div>
          {!confirmLimparTabela ? (
            <button
              disabled={isRequestOngoing}
              onClick={() => {
                setConfirmLimparTabela(true)
              }}
            >
              Limpar
            </button>
          ) : (
            <button disabled={isRequestOngoing} onClick={handleClear}>
              Confirme Limpar
            </button>
          )}
          <button disabled={isRequestOngoing} onClick={handleEnviarTickets}>
            Enviar Tickets
          </button>
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
