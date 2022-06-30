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

export const validURL = (value: string) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value,
  )
}

export const getIcon = (url: string) => {
  if (!validURL(url)) return ''
  let socialName = ''
  const domain = new URL(url)
  const host = domain.hostname.replace('www.', '')
  for (const char of host) {
    if (char === '.') break
    socialName += char
  }
  const iconName = SOCIALS_MEDIA[socialName.toLowerCase()]
  if (!iconName) return SOCIALS_MEDIA['global']
  return iconName
}
