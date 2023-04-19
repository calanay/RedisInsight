import { visit } from 'unist-util-visit'
import { prepareTutorialDataFileUrlFromMd } from 'uiSrc/utils/pathUtil'

export const remarkRedisUpload = (path: string): (tree: Node) => void => (tree: any) => {
  // Find code node in syntax tree
  visit(tree, 'inlineCode', (node) => {
    try {
      const { value } = node

      const [, filePath, label] = value.match(/^redis-upload:\[(.*)] (.*)/i)

      const { pathname } = new URL(prepareTutorialDataFileUrlFromMd(filePath, path))

      if (path && label) {
        node.type = 'html'
        // Replace it with our custom component
        node.value = `<RedisUploadButton label="${label}" path="${pathname}" />`
      }
    } catch (e) {
      // ignore errors
    }
  })
}
