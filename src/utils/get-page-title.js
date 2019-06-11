import defaultSettings from '@/settings'

const title = defaultSettings.title || 'JFUN CLOUD'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
