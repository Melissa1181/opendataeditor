import * as React from 'react'
import * as zustand from 'zustand'
import create from 'zustand/vanilla'
import { assert } from 'ts-essentials'
import { Client } from '../../../client'
import { IFile, IFieldItem } from '../../../interfaces'
import { ChartProps } from './Chart'

export interface State {
  client: Client
  file?: IFile
  chart?: any
  fields?: IFieldItem[]
  axisX?: string
  axisY?: string

  // General

  loadFields: () => Promise<void>
  setAxisX: (axisX: string) => void
  setAxisY: (axisX: string) => void
  drawChart: () => Promise<void>
}

export function createStore(props: ChartProps) {
  return create<State>((set, get) => ({
    client: props.client,
    file: props.file,

    // General

    loadFields: async () => {
      const { client } = get()
      const { items } = await client.fieldList()
      set({ fields: items })
    },
    setAxisX: (axisX) => set({ axisX }),
    setAxisY: (axisY) => set({ axisY }),
    drawChart: async () => {
      const { client, file, axisX, axisY } = get()
      if (!file) return
      const { table } = await client.tableRead({ path: file.path })
      if (!axisX || !axisY) return
      const chart = {
        $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
        data: { values: table.rows },
        mark: 'line',
        encoding: {
          x: { timeUnit: 'year', field: axisX, type: 'temporal' },
          y: { aggregate: 'mean', field: axisY, type: 'quantitative' },
          color: { field: 'symbol', type: 'nominal' },
        },
      } as any
      console.log(chart)
      set({ chart })
    },
  }))
}

export function useStore<R>(selector: (state: State) => R): R {
  const store = React.useContext(StoreContext)
  assert(store, 'store provider is required')
  return zustand.useStore(store, selector)
}

const StoreContext = React.createContext<zustand.StoreApi<State> | null>(null)
export const StoreProvider = StoreContext.Provider