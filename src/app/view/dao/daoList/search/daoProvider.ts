import lunr, { Index } from 'lunr'

import { DaoData } from '@interdao/core'
import { MetaData } from 'app/model/metadata.controller'

type SearchDataType = DaoData & MetaData
type RegisterDaoData = Record<string, SearchDataType>
class DaoProvider {
  private daoMap: Map<string, SearchDataType>
  private engine: Index | undefined
  register: RegisterDaoData

  constructor(register: RegisterDaoData) {
    this.register = register
    this.daoMap = new Map<string, SearchDataType>()
    this.engine = lunr(function () {
      this.ref('address')
      this.field('address')
      this.field('daoName')
      this.field('description')
      this.field('daoRegime')
      Object.keys(register).forEach((address: string) => {
        const doc = register[address]
        if (doc) this.add(doc)
      })
    })
    // build dao map
    this._setDaoMap()
  }

  private _setDaoMap = async (): Promise<[Map<string, SearchDataType>]> => {
    Object.keys(this.register).forEach((daoAddress) =>
      this.daoMap.set(daoAddress, this.register[daoAddress]),
    )
    return [this.daoMap]
  }

  all = async (): Promise<SearchDataType[]> => {
    const [daoMap] = await this._setDaoMap()
    return Array.from(daoMap.values())
  }

  findByAddress = async (addr: string): Promise<string[] | undefined> => {
    const [daoMap] = await this._setDaoMap()
    if (daoMap.has(addr)) return [addr]
    return
  }

  find = async (keyword: string, limit = 10): Promise<string[] | undefined> => {
    const [daoMap] = await this._setDaoMap()
    const engine = this.engine
    if (!engine) return

    let daos: SearchDataType[] = []
    if (!keyword) return

    const fuzzy = keyword + '~2'
    engine.search(fuzzy).forEach(({ ref }) => {
      if (daos.findIndex(({ mint }) => mint.toString() === ref) < 0) {
        const dao = daoMap.get(ref)
        if (dao) daos.push(dao)
      }
    })
    const nextDaos: string[] = []
    daos.slice(0, limit).forEach((dao) => {
      if (dao.address) nextDaos.push(dao.address)
    })
    return nextDaos
  }
}

export default DaoProvider
