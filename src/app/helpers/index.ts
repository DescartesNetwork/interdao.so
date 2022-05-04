import { CID } from 'ipfs-core'
import { DaoData } from '@interdao/core'
import IPFS from 'shared/pdb/ipfs'

import { DaoDataState } from 'app/model/dao.controller'
import { MetaData } from 'app/model/metadata.controller'

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

export const parseDaoData = async (
  daoData: DaoDataState,
): Promise<Record<string, DaoData & MetaData> | undefined> => {
  try {
    if (!daoData) throw new Error('Invalid Dao data!')
    const ipfs = new IPFS()
    const results = await Promise.all(
      Object.keys(daoData).map(async (daoAddr) => {
        const { metadata: digest, regime } = daoData[daoAddr]
        const cid = getCID(digest)
        const data = await ipfs.get(cid)
        const daoRegime = Object.keys(regime)[0]
        return {
          [daoAddr]: {
            ...daoData[daoAddr],
            ...data,
            address: daoAddr,
            daoRegime,
          },
        }
      }),
    )
    const nextDaoData: Record<string, DaoData & MetaData> = {}
    for (const rs of results) {
      const daoAddr = Object.keys(rs)[0]
      nextDaoData[daoAddr] = rs[daoAddr]
    }
    if (!nextDaoData) return
    return nextDaoData
  } catch (err) {
    return
  }
}
