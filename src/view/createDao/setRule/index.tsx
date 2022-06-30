import { useSelector } from 'react-redux'

import FlexibleDaoRule from './flexible'
import MultiSigDAORule from './multisig'

import { AppState } from 'model'

const DaoRule = () => {
  const daoType = useSelector(
    (state: AppState) => state.createDao.data.metadata.daoType,
  )
  return daoType === 'flexible-dao' ? <FlexibleDaoRule /> : <MultiSigDAORule />
}
export default DaoRule
