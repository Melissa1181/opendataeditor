import * as React from 'react'
import Editor from '@monaco-editor/react'
import { useStore, selectors } from './store'

export default function Text() {
  const text = useStore((state) => state.text)
  const editor = useStore((state) => state.editor)
  const language = useStore(selectors.language)
  const onChange = useStore((state) => state.onChange)
  return (
    <Editor
      value={text}
      language={language}
      options={{
        automaticLayout: true,
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        formatOnPaste: true,
        formatOnType: true,
        scrollBeyondLastLine: false,
      }}
      onChange={(value) => onChange(value)}
      onMount={(ref) => {
        // @ts-ignore
        editor.current = ref
      }}
    />
  )
}