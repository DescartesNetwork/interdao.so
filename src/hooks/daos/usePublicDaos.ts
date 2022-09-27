import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'
import { DaoState } from 'model/daos.controller'
import { ipfs } from 'helpers/ipfs'

const usePublicDaos = (daoType: string, mechanismsType: string): DaoState => {
  const daos = useSelector((state: AppState) => state.daos)
  const [filteredDaos, setFilteredDaos] = useState<DaoState>({})

  const filterDaos = useCallback(async () => {
    const filteredDaos: DaoState = {}
    for (const addr in daos) {
      const { isPublic, regime, metadata } = daos[addr]
      if (!isPublic) continue
      // Validate type
      if (daoType !== 'all') {
        const metaData = await ipfs.methods.daoMetadata.get(metadata)
        if (metaData?.daoType !== daoType) continue
      }
      // Validate Regime
      if (mechanismsType !== 'all') {
        const parseRegime = Object.keys(regime)[0]
        if (parseRegime !== mechanismsType) continue
      }
      filteredDaos[addr] = daos[addr]
    }
    return setFilteredDaos(filteredDaos)
  }, [daoType, daos, mechanismsType])

  useEffect(() => {
    filterDaos()
  }, [filterDaos])

  return filteredDaos
}
export default usePublicDaos
