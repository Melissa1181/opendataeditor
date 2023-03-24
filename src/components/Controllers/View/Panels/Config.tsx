import * as React from 'react'
import View from '../../../Editors/View'
import { useStore } from '../store'

export default function ConfigPanel() {
  const view = useStore((state) => state.view)
  const fields = useStore((state) => state.fields)
  const setView = useStore((state) => state.setView)
  const setQueryValidationStatus = useStore((state) => state.setQueryValidationStatus)
  return (
    <View
      view={view}
      fields={fields}
      onViewChange={setView}
      onQueryValidation={setQueryValidationStatus}
    />
  )
}