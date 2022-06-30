import { AppState } from 'model'
import { useSelector } from 'react-redux'

import ChooseDaoType from './chooseType'
import DaoInputDetails from './daoInputDetail'
import Review from './review'
import DaoRule from './setRule'

import { CreateDaoSteps } from 'model/createDao.controller'

const InitDAOBody = () => {
  const step = useSelector((state: AppState) => state.createDao.step)
  if (step === CreateDaoSteps.ChooseType) return <ChooseDaoType />
  if (step === CreateDaoSteps.InputDetails) return <DaoInputDetails />
  if (step === CreateDaoSteps.SetRule) return <DaoRule />
  return <Review />
}

export default InitDAOBody
