import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Ticket } from '../types/Ticket'

// Custom APIs for renderer
const api = {
  criarTicketsEAdicionarTags: async (rows: Ticket[]) => {
    // console.log('preload')

    return await ipcRenderer.invoke('client:criarTicketsEAdicionarTags', rows)
  },

  onTicketProgress: (callback: (result: any) => void) => {
    ipcRenderer.on('tickets:progress', (_event, result) => {
      callback(result)
    })
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
