import { useDispatch, useSelector } from 'react-redux'
import BN from 'bn.js'

import CirculatingSupplyInput from './circulatingSupplyInput'
import CirculatingSupplyInputNFT from './circulatingSupplyInputNFT'

import { setInitDao } from 'app/model/dao.controller'
import { AppDispatch, AppState } from 'app/model'

const CirculatingSupply = () => {
  const initDao = useSelector((state: AppState) => state.dao.initDao)
  const dispatch = useDispatch<AppDispatch>()

  const { isNft, supply, mintAddress } = initDao

  return !isNft ? (
    <CirculatingSupplyInput
      mintAddress={mintAddress}
      value={supply?.toString()}
      onChange={(supply) =>
        dispatch(setInitDao({ ...initDao, supply: new BN(supply) }))
      }
    />
  ) : (
    <CirculatingSupplyInputNFT
      mintAddress={mintAddress}
      value={supply?.toString()}
      onChange={(supply) =>
        dispatch(setInitDao({ ...initDao, supply: new BN(supply) }))
      }
    />
  )
}

export default CirculatingSupply
