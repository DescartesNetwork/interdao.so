import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { MetaData } from 'app/model/metadata.controller'
import usePDB from './usePDB'

const useDaoType = (type: string) => {
  const daos = useSelector((state: AppState) => state.dao.daos)
  const [daoAddresses, setDaoAddresses] = useState<string[]>([])
  const pdb = usePDB()

  const filterAddress = useCallback(async () => {
    const listAddress = Object.keys(daos)
    if (type === 'all-type') return setDaoAddresses(listAddress)
    const addresses = []
    for (const address in daos) {
      const { daoType } = (await pdb.getItem(address)) as MetaData
      if (daoType === type) addresses.push(address)
    }
    return setDaoAddresses(addresses)
  }, [daos, pdb, type])

  useEffect(() => {
    filterAddress()
  }, [filterAddress])

  return daoAddresses
}

export default useDaoType
