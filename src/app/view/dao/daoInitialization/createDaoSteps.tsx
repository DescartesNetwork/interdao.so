import ChooseDaoType from './chooseDaoType'
import ConfirmCreate from './confirmCreate'
import DaoRule from './daoRule'
import MetaDataForm from './metaDataForm'

export enum CreateSteps {
  stepOne = 1,
  stepTwo = 2,
  stepThree = 3,
}

const CreateDaoSteps = ({ step }: { step: number }) => {
  if (step === CreateSteps.stepOne) return <MetaDataForm />
  if (step === CreateSteps.stepTwo) return <DaoRule />
  if (step === CreateSteps.stepThree) return <ConfirmCreate />
  return <ChooseDaoType />
}

export default CreateDaoSteps
