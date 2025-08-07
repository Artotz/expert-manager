import { ElectronAPI } from '@electron-toolkit/preload'
import { Ticket } from 'src/types/Ticket'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      criarTicketsEAdicionarTags: (rows: Ticket[]) => Promise<any>
    }
  }
}
