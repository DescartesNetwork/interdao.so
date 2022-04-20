import { CID } from 'ipfs-core'

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
