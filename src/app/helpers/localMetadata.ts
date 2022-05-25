import { account } from '@senswap/sen-js'
import configs from 'app/configs'
import { DAOMember } from 'app/model/metadata.controller'
import PDB from 'shared/pdb'

const {
  manifest: { appId },
} = configs

export type MetaData = {
  daoName: string
  description: string
  image: string | ArrayBuffer | null
  optionals: string[]
  daoType: string
  members: DAOMember[]
}

class LocalMetadata {
  private db: LocalForage
  private key: string

  constructor(key: string, walletAddress: string) {
    if (!key) throw new Error('Invalid key')
    this.key = key
    if (!account.isAddress(walletAddress))
      throw new Error('Invalid wallet address')
    const db = new PDB(walletAddress).createInstance(appId)
    if (!db) throw new Error('Invalid storage')
    this.db = db
  }

  set = async (metadata: MetaData) => {
    return await this.db.setItem(this.key, metadata)
  }

  get = async (): Promise<MetaData | null> => {
    return (await this.db.getItem(this.key)) || null
  }
}

export default LocalMetadata
