import { RESOURCES_BASE_URL } from 'uiSrc/services/resourcesService'
import { IS_ABSOLUTE_PATH } from 'uiSrc/constants/regex'

enum TutorialsPaths {
  CustomTutorials = 'custom-tutorials',
  Guide = 'guides',
  Tutorials = 'tutorials',
}

export const prepareTutorialDataFileUrlFromMd = (nodeUrl: string, mdPath: string): string => {
  // process external link
  if (IS_ABSOLUTE_PATH.test(nodeUrl)) {
    return nodeUrl
  }

  // process absolute path
  if (nodeUrl.startsWith('/') || nodeUrl.startsWith('\\')) {
    const paths = mdPath?.split('/') || []
    let tutorialRootPath
    switch (paths[1]) {
      case TutorialsPaths.CustomTutorials:
        tutorialRootPath = paths.slice(0, 3).join('/')
        break
      case TutorialsPaths.Guide:
      case TutorialsPaths.Tutorials:
        tutorialRootPath = paths.slice(0, 2).join('/')
        break
      default:
        tutorialRootPath = mdPath
        break
    }

    return new URL(tutorialRootPath + nodeUrl, RESOURCES_BASE_URL).toString()
  }

  // process relative path
  const pathUrl = new URL(mdPath, RESOURCES_BASE_URL)
  return new URL(nodeUrl, pathUrl).toString()
}
