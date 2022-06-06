import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import VoteNftInput from './voteNftInput'
import VoteTokenInput from './voteTokenInput'

const VoteInput = () => {
  const initDao = useSelector((state: AppState) => state.daos.initDao)
  const { isNft } = initDao
  return isNft ? <VoteNftInput /> : <VoteTokenInput />
}

export default VoteInput
