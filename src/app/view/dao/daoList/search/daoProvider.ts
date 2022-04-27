import { web3 } from '@project-serum/anchor'
import lunr, { Index, Pipeline, Token } from 'lunr'

import { DaoDataState, DaoMetaData } from 'app/model/dao.controller'

class DaoProvider {
  private daoMap: Map<string, DaoMetaData>
  private engine: Index | undefined
  register: DaoDataState

  constructor(register: DaoDataState) {
    this.register = register
    this.daoMap = new Map<string, DaoMetaData>()
    this.engine = undefined
    // build dao map
    this._setDaoMap()
    // Build engine
    this._init()
  }

  private _setDaoMap = async (): Promise<[Map<string, DaoMetaData>]> => {
    Object.keys(this.register).forEach((daoAddress) =>
      this.daoMap.set(daoAddress, this.register[daoAddress]),
    )
    return [this.daoMap]
  }

  private _init = () => {
    const register = this.register
    // Register pipeline function
    const parsePublicKey = function () {
      console.log('pipe ;ine')
    }

    // Build lunr
    lunr(function () {
      this.ref('address')
      this.field('meta_data:daoName')
      this.field('address')
      this.field('name')
      this.field('meta_data:description')
      Object.keys(register).forEach((address: string) => {
        const doc = register[address]
        const { meta_data } = doc
        if (meta_data) this.add(doc)
      })
      this.pipeline.add(parsePublicKey)
    })
  }

  all = async (): Promise<DaoMetaData[]> => {
    const [daoMap] = await this._setDaoMap()
    return Array.from(daoMap.values())
  }

  findByAddress = async (addr: string): Promise<DaoMetaData | undefined> => {
    const [daoMap] = await this._setDaoMap()
    return daoMap.get(addr)
  }

  find = async (keyword: string, limit = 10): Promise<DaoDataState> => {
    const [daoMap] = await this._setDaoMap()
    const engine = this.engine
    if (!engine) return {}

    let daos: DaoMetaData[] = []
    if (!keyword) return {}

    const fuzzy = keyword + '~1'
    engine.search(fuzzy).forEach(({ ref }) => {
      if (daos.findIndex(({ mint }) => mint.toBase58() === ref) < 0) {
        const dao = daoMap.get(ref)
        if (dao) daos.push(dao)
      }
    })
    const nextDaos: DaoDataState = {}
    daos.slice(0, limit).forEach((dao) => (nextDaos[dao.address] = { ...dao }))
    return nextDaos
  }
}

export default DaoProvider
