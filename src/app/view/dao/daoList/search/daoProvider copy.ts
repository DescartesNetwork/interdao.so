import { MetaData } from 'app/helpers/localMetadata'
import lunr, { Index } from 'lunr'

export type SearchData = { daoAddress: string } & MetaData
export type RegisterDaoData = Record<string, SearchData>
class DaoProvider {
  private daoMap: Map<string, SearchData>
  private engine: Index | undefined
  register: RegisterDaoData

  constructor(register: RegisterDaoData) {
    this.register = register
    this.daoMap = new Map<string, SearchData>()
    this.engine = lunr(function () {
      this.ref('daoAddress')
      this.field('daoAddress')
      this.field('daoName')
      this.field('description')
      Object.keys(register).forEach((address: string) => {
        const doc = register[address]
        if (doc) this.add(doc)
      })
    })
    // build dao map
    this._setDaoMap()
  }

  private _setDaoMap = async (): Promise<[Map<string, SearchData>]> => {
    Object.keys(this.register).forEach((daoAddress) =>
      this.daoMap.set(daoAddress, this.register[daoAddress]),
    )
    return [this.daoMap]
  }

  all = async (): Promise<SearchData[]> => {
    const [daoMap] = await this._setDaoMap()
    return Array.from(daoMap.values())
  }

  findByAddress = async (addr: string): Promise<string[] | undefined> => {
    const [daoMap] = await this._setDaoMap()
    if (daoMap.has(addr)) return [addr]
    return
  }

  find = async (keyword: string, limit = 10): Promise<string[] | undefined> => {
    console.log(keyword)
    const [daoMap] = await this._setDaoMap()
    const engine = this.engine
    if (!engine) return
    console.log(engine)
    let daos: SearchData[] = []
    if (!keyword) return

    const fuzzy = keyword + '~1'
    engine.search(fuzzy).forEach(({ ref }) => {
      console.log(ref)
      if (daos.findIndex(({ daoAddress }) => daoAddress === ref) < 0) {
        const dao = daoMap.get(ref)
        if (dao) daos.push(dao)
      }
    })
    const nextDaos: string[] = []
    daos.slice(0, limit).forEach(({ daoAddress }) => {
      if (daoAddress) nextDaos.push(daoAddress)
    })
    return nextDaos
  }
}

export default DaoProvider
