import { getClientSideURL } from '@/utilities/getURL'
import type { Media } from '@/payload-types'

/**
 * Processes media resource URL to ensure proper formatting
 * @param resource The original URL string or Media object from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (resource: string | Media | null | undefined, cacheTag?: string | null): string => {
  // Extract URL from Media object if needed
  let url: string | null | undefined
  if (typeof resource === 'object' && resource !== null) {
    url = resource.url
  } else {
    url = resource
  }

  if (!url || url === '') return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}
