import { monaco } from 'react-monaco-editor'
import * as monacoEditor from 'monaco-editor'
import { isString } from 'lodash'
import { generateDetail } from 'uiSrc/pages/workbench/utils/query'
import { Maybe } from 'uiSrc/utils'
import { IRedisCommand, ICommandTokenType } from 'uiSrc/constants'

export const setCursorPositionAtTheEnd = (editor: monacoEditor.editor.IStandaloneCodeEditor) => {
  if (!editor) return

  const rows = editor.getValue().split('\n')

  editor.setPosition({
    column: rows[rows.length - 1].trimEnd().length + 1,
    lineNumber: rows.length
  })

  editor.focus()
}

export const getRange = (position: monaco.Position, word: monaco.editor.IWordAtPosition): monaco.IRange => ({
  startLineNumber: position.lineNumber,
  endLineNumber: position.lineNumber,
  endColumn: word.endColumn,
  startColumn: word.startColumn,
})

export const buildSuggestion = (arg: IRedisCommand, range: monaco.IRange, options: any = {}) => {
  const extraQuotes = arg.expression ? '\'$1\'' : ''
  return {
    label: isString(arg) ? arg : arg.token || arg.arguments?.[0].token || arg.name || '',
    insertText: `${arg.token || arg.arguments?.[0].token || arg.name?.toUpperCase() || ''} ${extraQuotes}`,
    insertTextRules: monacoEditor.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range,
    kind: options?.kind || monacoEditor.languages.CompletionItemKind.Function,
    ...options,
  }
}

export const getRediSearchSignutureProvider = (options: Maybe<{
  isOpen: boolean
  currentArg: IRedisCommand
  parent: Maybe<IRedisCommand>
}>) => {
  const { isOpen, currentArg, parent } = options || {}
  if (!isOpen) return null

  const label = generateDetail(parent)
  const arg = currentArg?.type === ICommandTokenType.Block
    ? currentArg?.arguments?.[0]?.name
    : (currentArg?.name || currentArg?.type || '')

  return {
    dispose: () => {},
    value: {
      activeParameter: 0,
      activeSignature: 0,
      signatures: [{
        label: label || '',
        parameters: [{ label: arg }]
      }]
    }
  }
}
