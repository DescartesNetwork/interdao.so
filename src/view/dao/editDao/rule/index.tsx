import EditMultisigDaoRule from './editMultisigDaoRule'
import EditFlexibleDaoRule from './editFlexibleDaoRule'

import useMetaData from 'hooks/useMetaData'

const Rule = ({ daoAddress }: { daoAddress: string }) => {
  const { metaData } = useMetaData(daoAddress)

  return metaData?.daoType === 'multisig-dao' ? (
    <EditMultisigDaoRule daoAddress={daoAddress} />
  ) : (
    <EditFlexibleDaoRule daoAddress={daoAddress} />
  )
}

export default Rule
