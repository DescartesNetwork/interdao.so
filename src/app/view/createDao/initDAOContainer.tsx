import { AppState } from 'app/model'
import { useSelector } from 'react-redux'

import ChooseDaoType from './chooseDaoType'
import ReviewAndCreateFlexibleDAO from './flexibleDAO/reviewAndCreate'
import ReviewAndCreateMultisigDAO from './multisigDAO/reviewAndCreate'
import FlexibleDAORule from './flexibleDAO/daoRule'
import MultiSigDAORule from './multisigDAO/daoRule'
import DaoInformation from './daoInfomation'

export enum CreateDaoSteps {
  stepOne = 1,
  stepTwo = 2,
  stepThree = 3,
}

const InitDAOContainer = ({ step }: { step: number }) => {
  const daoType = useSelector(
    (state: AppState) => state.metadata.initMetadata.daoType,
  )
  if (step === CreateDaoSteps.stepOne) return <DaoInformation />

  if (step === CreateDaoSteps.stepTwo && daoType === 'flexible-dao')
    return <FlexibleDAORule />
  if (step === CreateDaoSteps.stepTwo && daoType === 'multisig-dao')
    return <MultiSigDAORule />

  if (step === CreateDaoSteps.stepThree && daoType === 'flexible-dao')
    return <ReviewAndCreateFlexibleDAO />
  if (step === CreateDaoSteps.stepThree && daoType === 'multisig-dao')
    return <ReviewAndCreateMultisigDAO />

  return <ChooseDaoType />
}

export default InitDAOContainer
