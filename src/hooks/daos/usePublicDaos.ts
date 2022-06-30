import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'
import { DaoState } from 'model/daos.controller'
import { MetaData } from 'model/createDao.controller'
import usePDB from '../usePDB'

const usePublicDaos = (daoType: string, mechanismsType: string): DaoState => {
  const daos = useSelector((state: AppState) => state.daos)
  const [filteredDaos, setFilteredDaos] = useState<DaoState>({})
  const pdb = usePDB()

  const filterDaos = useCallback(async () => {
    const filteredDaos: DaoState = {}
    for (const addr in daos) {
      const daoData = daos[addr]
      const { isPublic, regime } = daoData
      if (!isPublic) continue
      // Validate type
      if (daoType !== 'all') {
        const metaData = (await pdb.getItem(addr)) as MetaData
        if (metaData?.daoType !== daoType) continue
      }
      // Validate Regime
      if (mechanismsType !== 'all') {
        const parseRegime = Object.keys(regime)[0]
        if (parseRegime !== mechanismsType) continue
      }
      filteredDaos[addr] = daoData
    }
    return setFilteredDaos(filteredDaos)
  }, [daoType, daos, mechanismsType, pdb])

  useEffect(() => {
    filterDaos()
  }, [filterDaos])

  return filteredDaos
}
export default usePublicDaos
