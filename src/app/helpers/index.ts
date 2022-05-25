import { CID } from 'ipfs-core'

const SOCIALS_MEDIA: Record<string, string> = {
  t: 'logo-telegram',
  twitter: 'logo-twitter',
  facebook: 'logo-facebook',
  discord: 'logo-discord',
  global: 'globe',
  medium: 'logo-medium',
}
export const fileToBase64 = (
  file: File,
  callBack: (result: string | ArrayBuffer | null) => void,
) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = async () => {
    if (reader.result) callBack(reader.result)
  }
}

export const getCID = (digest: number[]) => {
  const v0Prefix = new Uint8Array([18, 32])
  const v0Digest = new Uint8Array(v0Prefix.length + digest?.length)
  v0Digest.set(v0Prefix) // multicodec + length
  v0Digest.set(digest, v0Prefix.length)
  const cid = CID.decode(v0Digest)
  return cid.toString()
}

export const validURL = (url: string) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ) // fragment locator
  return !!pattern.test(url)
}

export const getIcon = (url: string) => {
  if (!validURL) return ''
  let socialName = ''
  const domain = new URL(url)
  const host = domain.hostname.replace('www.', '')
  for (const char of host) {
    if (char === '.') break
    socialName += char
  }
  const iconName = SOCIALS_MEDIA[socialName]
  if (!iconName) return SOCIALS_MEDIA['global']
  return iconName
}
