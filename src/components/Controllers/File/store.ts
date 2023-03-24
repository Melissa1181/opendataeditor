import noop from 'lodash/noop'
import * as React from 'react'
import * as zustand from 'zustand'
import create from 'zustand/vanilla'
import { assert } from 'ts-essentials'
import { Client } from '../../../client'
import { IFile } from '../../../interfaces'
import { FileProps } from './File'

export interface State {
  // Data

  client: Client
  file: IFile
  isMetadata?: boolean
  bytes?: ArrayBuffer
  text?: string

  // Logic

  toggleMetadata: () => void
  loadBytes: () => Promise<void>
  loadText: () => Promise<void>
  exportFile?: (format: string) => void
  importFile?: () => void
  updateResource?: () => void
}

export function createStore(props: FileProps) {
  return create<State>((set, get) => ({
    // Data

    ...props,
    tablePatch: {},

    // Logic

    toggleMetadata: () => {
      set({ isMetadata: !get().isMetadata })
    },
    loadBytes: async () => {
      const { client, file } = get()
      const { bytes } = await client.bytesRead({ path: file.path })
      set({ bytes })
    },
    loadText: async () => {
      const { client, file } = get()
      const { text } = await client.textRead({ path: file.path })
      set({ text })
    },
    // TODO: implement
    exportFile: noop,
    importFile: noop,
    updateResource: noop,
  }))
}

export function useStore<R>(selector: (state: State) => R): R {
  const store = React.useContext(StoreContext)
  assert(store, 'store provider is required')
  return zustand.useStore(store, selector)
}

const StoreContext = React.createContext<zustand.StoreApi<State> | null>(null)
export const StoreProvider = StoreContext.Provider