import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

interface TableProps {
  state: any
}

export default function Table(props: TableProps) {
  const rows = props.state.rows.map((row: any, index: number) => ({ ...row, id: index }))
  const columns = props.state.resource.schema.fields.map((field: any) => {
    return {
      field: field.name,
      headerName: field.title || field.name,
      // TODO: extend the mapping
      type: field.type === 'number' ? 'number' : 'string',
    }
  })
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5]}
        sortingOrder={['desc', 'asc', null]}
        disableSelectionOnClick
      />
    </div>
  )
}