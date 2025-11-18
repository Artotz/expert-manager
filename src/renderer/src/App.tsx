// App.tsx
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
import './assets/main.css'

// ✅ importe suas imagens (a “faixa amarela + topo preto” como fundo)
import bg from './assets/backgroundCSC.jpg'

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

// const leadTipos = [
//   'LEAD TRANSFERÊNCIA',
//   'LEAD RECONEXÃO',
//   'LEAD DISPONIBILIDADE',
//   'LEAD RODANTE',
//   'LEAD LÂMINA',
//   'LEAD DENTES',
//   'LEAD REFORMA DE COMPONENTES',
//   'LEAD GARANTIA ESTENDIDA',
//   'LEAD GARANTIA BÁSICA',
//   'LEAD CORRETIVA',
//   'LEAD PREVENTIVA',
//   'LEAD RTA'
// ]

// 🎨 estilos “BI-like” (inline)
const ui = {
  root: {
    flexDirection: 'column',
    flexGrow: 0,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    backgroundImage: `url(${bg})`,
    backgroundSize: '100vw 100vh',
    // backgroundSize: 'contain',
    // backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    overflow: 'hidden',
    fontFamily: 'Inter, Segoe UI, Roboto, system-ui, sans-serif'
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: '0 20px',
    flexShrink: 0,
    height: '5vh',
    overflow: 'hidden'
    // background: 'rgba(0,0,0,0.92)',
    // borderBottom: '3px solid #F2C200'
  } as React.CSSProperties,
  title: {
    color: '#FFD700',
    fontWeight: 800,
    fontSize: '3vh',
    whiteSpace: 'nowrap',
    font: 'arial',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    overflow: 'hidden'
  } as React.CSSProperties,
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    height: '100%',
    overflow: 'hidden',
    paddingTop: 16,
    paddingRight: '1vw',
    paddingLeft: '15vw',
    paddingBottom: 4
  } as React.CSSProperties,
  card: {
    background: 'rgba(255,255,255,0.96)',
    border: '3px solid #F2C200',
    borderRadius: 16,
    boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
    padding: 12,
    flexGrow: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: 12
  } as React.CSSProperties,
  controls: {
    display: 'flex',
    gap: 10
  } as React.CSSProperties,
  btn: {
    padding: '8px 14px',
    borderRadius: 10,
    border: '2px solid #F2C200',
    background: '#111',
    color: '#FFD700',
    fontWeight: 700,
    cursor: 'pointer'
  } as React.CSSProperties,
  btnGhost: {
    padding: '8px 14px',
    borderRadius: 10,
    border: '2px solid #F2C200',
    background: 'transparent',
    color: '#111',
    fontWeight: 700,
    cursor: 'pointer'
  } as React.CSSProperties,
  footer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    height: '10vh',
    flexShrink: 0,
    gap: 16
  } as React.CSSProperties
}

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
      const [chassi, tipoContato, resumo, horimetro, empresa, telefone, advisorId] = line
        .split('\t')
        .map((cell) => cell.trim())

      return { chassi, tipoContato, resumo, horimetro, empresa, telefone, advisorId }
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
    setProgress([])
    setIsRequestOngoing(true)
    const result = await window.api.criarTicketsEAdicionarTags(rows)
    console.log('resultado: ', result)
    setIsRequestOngoing(false)
  }

  // const cellStyle: React.CSSProperties = { backgroundColor: 'rgba(255, 88, 88, 0.2)' }

  // @ts-ignore bruhhh
  function renderCell(key: React.Key, props: CellRendererProps<Row, unknown>) {
    // const style =
    //   // eslint-disable-next-line react/prop-types
    //   props.column.key === 'resumo' && !leadTipos.includes(props.row.resumo) ? cellStyle : undefined
    // return <Cell key={key} style={style} {...props} />
    return <Cell key={key} {...props} />
  }

  // @ts-ignore bruhhh
  function renderRow(key: React.Key, props: RenderRowProps<Row>) {
    let rowProgress: React.CSSProperties = {}
    // eslint-disable-next-line react/prop-types
    switch (checkProgress(props.rowIdx)) {
      case 'ticket-success':
        rowProgress = { backgroundColor: 'rgba(46, 204, 113, 0.22)' }
        break
      case 'ticket-warning':
        rowProgress = { backgroundColor: 'rgba(241, 196, 15, 0.24)' }
        break
      case 'ticket-failure':
        rowProgress = { backgroundColor: 'rgba(231, 76, 60, 0.22)' }
        break
    }

    return <Row key={key} style={rowProgress} {...props} />
  }

  return (
    <div style={ui.root}>
      {/* topo preto com faixa */}
      <header style={ui.header}>
        <div style={ui.title}>Importar e Criar Tickets</div>
      </header>

      {/* conteúdo com “card” branco e borda amarela */}
      <div style={ui.content}>
        <div style={ui.card}>
          {/* Grid */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              // overflowX: 'clip',
              overflow: 'hidden'
            }}
            onPaste={handlePaste}
          >
            <DataGrid
              columns={defaultColumns}
              rows={rows}
              onRowsChange={setRows}
              // headerRowClass={'rdg-header'}
              // 🎨 tema do RDG via CSS vars inline
              style={{
                // @ts-ignore asdasda
                '--rdg-header-background-color': '#111',
                '--rdg-background-color': 'transparent',
                '--rdg-row-hover-background-color': 'rgba(0,0,0,0.03)',
                '--rdg-border-color': 'rgba(0,0,0,0.12)',
                '--rdg-font-size': '14px',
                borderRadius: 12,
                overflowY: 'scroll',
                width: '100%',
                height: '100%'
                // minHeight: '100%',
              }}
              className="rdg-light"
              renderers={{ renderCell, renderRow }}
            />
          </div>

          {/* ações */}
          <div style={ui.controls}>
            {!confirmLimparTabela ? (
              <button
                style={ui.btnGhost}
                disabled={isRequestOngoing}
                onClick={() => setConfirmLimparTabela(true)}
              >
                Limpar
              </button>
            ) : (
              <button style={ui.btn} disabled={isRequestOngoing} onClick={handleClear}>
                Confirmar Limpar
              </button>
            )}
            <button style={ui.btn} disabled={isRequestOngoing} onClick={handleEnviarTickets}>
              Enviar Tickets
            </button>
          </div>
        </div>
      </div>

      {/* rodapé “faixa cinza” vem do fundo; se quiser conteúdo, use ui.footer */}
      <footer style={ui.footer}></footer>
    </div>
  )
}

export default App
