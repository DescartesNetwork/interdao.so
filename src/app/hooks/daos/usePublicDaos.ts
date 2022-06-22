import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { DaoState } from 'app/model/daos.controller'

const usePublicDaos = (daoType: string, mechanismsType: string): DaoState => {
  const daos = useSelector((state: AppState) => state.daos)
  const [filteredDaos, setFilteredDaos] = useState<DaoState>({})

  const filterDaos = useCallback(async () => {
    const filteredDaos: DaoState = {}

    for (const addr in daos) {
      const daoData = daos[addr]
      const { isPublic } = daoData

      if (isPublic) filteredDaos[addr] = daoData
    }
    return setFilteredDaos(filteredDaos)
  }, [daos])

  useEffect(() => {
    filterDaos()
  }, [filterDaos])

  return filteredDaos
}
export default usePublicDaos
