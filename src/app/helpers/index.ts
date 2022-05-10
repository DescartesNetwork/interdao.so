import { CID } from 'ipfs-core'
import { DaoData } from '@interdao/core'
import IPFS from 'shared/pdb/ipfs'

import { DaoDataState } from 'app/model/dao.controller'
import { MetaData } from 'app/model/metadata.controller'
import PDB from 'shared/pdb'
import configs from 'app/configs'
import isEqual from 'react-fast-compare'

const {
  manifest: { appId },
} = configs

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
    const results = await Promise.all(
      Object.keys(daoData).map(async (daoAddr) => {
        const data = await cacheDaoData(daoAddr, daoData[daoAddr])
        return { [daoAddr]: data }
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

const cacheDaoData = async (daoAddress: string, daoData: DaoData) => {
  const wallet = window.sentre.wallet
  if (!wallet) throw new Error('Please connect wallet!')

  const ipfs = new IPFS()
  const { metadata: digest } = daoData
  const walletAddress = await wallet.getAddress()
  const db = new PDB(walletAddress).createInstance(appId)
  const dbDaoData = (await db.getItem(`interdao:${daoAddress}`)) as DaoData
  const { metadata } = dbDaoData || ({} as DaoData)

  if (!dbDaoData || (!!metadata && !isEqual(metadata, digest))) {
    const { metadata, regime } = daoData
    const cid = getCID(metadata)
    const data = await ipfs.get(cid)
    const daoRegime = Object.keys(regime)[0]
    const dbData = { ...daoData, ...data, daoRegime, address: daoAddress }
    await db.setItem(`interdao:${daoAddress}`, dbData)
    return dbData
  }
  return dbDaoData
}
