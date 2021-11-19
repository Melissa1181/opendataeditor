import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import cloneDeep from 'lodash/cloneDeep'
import { IPipeline } from './interfaces/pipeline'
import { IResource } from './interfaces/resource'
import { IReport } from './interfaces/report'
import { IStatus } from './interfaces/status'
import { IRow } from './interfaces/row'

export class Client {
  start(element: any) {
    ReactDOM.render(React.createElement(App, {}, null), element)
    return { dispose: () => ReactDOM.unmountComponentAtNode(element) }
  }

  // Actions

  async describe(file: File) {
    const body = new FormData()
    const buffer = await file.arrayBuffer()
    body.append('file', new Blob([buffer]), file.name)
    const payload = { method: 'POST', body: body }
    const response = await fetch('http://localhost:7070/api/describe', payload)
    return response.json() as Promise<{ resource: IResource }>
  }

  async extract(file: File, resource: IResource) {
    const body = new FormData()
    const buffer = await file.arrayBuffer()
    body.append('file', new Blob([buffer]), file.name)
    body.append('resource', JSON.stringify(resource))
    const payload = { method: 'POST', body: body }
    const response = await fetch('http://localhost:7070/api/extract', payload)
    return response.json() as Promise<{ rows: IRow[] }>
  }

  async validate(file: File, resource: IResource) {
    const body = new FormData()
    const buffer = await file.arrayBuffer()
    const inquiry = { tasks: [{ source: resource }] }
    body.append('file', new Blob([buffer]), file.name)
    body.append('inquiry', JSON.stringify(inquiry))
    const payload = { method: 'POST', body: body }
    const response = await fetch('http://localhost:7070/api/validate', payload)
    return response.json() as Promise<{ report: IReport }>
  }

  async transform(file: File, resource: IResource, pipeline: IPipeline) {
    const body = new FormData()
    const buffer = await file.arrayBuffer()
    if (pipeline) {
      pipeline = cloneDeep(pipeline)
      pipeline.tasks[0].type = 'resource'
      pipeline.tasks[0].source = resource
      for (const step of pipeline.tasks[0].steps) {
        if (!step.descriptor) continue
        const descriptor = JSON.parse(step.descriptor)
        for (const [key, value] of Object.entries(descriptor)) {
          // @ts-ignore
          step[key] = value
        }
      }
    } else {
      pipeline = {
        tasks: [
          {
            type: 'resource',
            source: resource,
            // @ts-ignore
            steps: [{ code: 'table-normalize' }],
          },
        ],
      }
    }
    body.append('file', new Blob([buffer]), file.name)
    body.append('pipeline', JSON.stringify(pipeline))
    const payload = { method: 'POST', body: body }
    const response = await fetch('http://localhost:7070/api/transform', payload)
    return response.json() as Promise<{ status: IStatus; targetRows: IRow[] }>
  }
}

export const client = new Client()
