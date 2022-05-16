import { AppState } from 'app/model'
import { useSelector } from 'react-redux'

import ChooseDaoType from './chooseDaoType'
import ReviewAndCreateFlexibleDAO from './flexibleDAO/reviewAndCreate'
import ReviewAndCreateMultisigDAO from './multisigDAO/reviewAndCreate'
import FlexibleDAORule from './flexibleDAO/daoRule'
import MultiSigDAORule from './multisigDAO/daoRule'
import MetaDataForm from './metaDataForm'

export enum CreateSteps {
  stepOne = 1,
  stepTwo = 2,
  stepThree = 3,
}

const InitDAOContainer = ({ step }: { step: number }) => {
  const {
    dao: { daoType },
  } = useSelector((state: AppState) => state)
  if (step === CreateSteps.stepOne) return <MetaDataForm />

  if (step === CreateSteps.stepTwo && daoType === 'flexible-dao')
    return <FlexibleDAORule />
  if (step === CreateSteps.stepTwo && daoType === 'multisig-dao')
    return <MultiSigDAORule />

  if (step === CreateSteps.stepThree && daoType === 'flexible-dao')
    return <ReviewAndCreateFlexibleDAO />
  if (step === CreateSteps.stepThree && daoType === 'multisig-dao')
    return <ReviewAndCreateMultisigDAO />

  return <ChooseDaoType />
}

export default InitDAOContainer
