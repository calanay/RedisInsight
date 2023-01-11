import { Maybe } from 'uiSrc/utils'
import { CodeButtonParams } from 'uiSrc/pages/workbench/components/enablement-area/interfaces'
import { identity, pickBy } from 'lodash'

export const parseParams = (params?: string): Maybe<CodeButtonParams> => {
  if (params?.match(/(^\[).+(]$)/g)) {
    return pickBy(params
      ?.replaceAll(' ', '')
      ?.replace(/^\[|]$/g, '')
      ?.split(';')
      .reduce((prev: {}, next: string) => {
        const [key, value] = next.split('=')
        return {
          [key]: value,
          ...prev,
        }
      }, {}),
    identity)
  }
  return undefined
}
