import { Fragment, useEffect, useState } from 'react'
import { getAnchorWallet, useWalletAddress } from '@sentre/senhub'
import InterDAO from '@interdao/core'
import { Utility } from '@sentre/utility'

import configs from 'configs'

export const AppLoader: React.FC = ({ children }) => {
  const address = useWalletAddress()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) return
    const wallet = getAnchorWallet()!
    window.interDao = new InterDAO(
      wallet,
      'https://devnet.genesysgo.net',
      configs.sol.interDaoProgramId,
    )
    window.senUtility = new Utility(wallet, 'https://devnet.genesysgo.net')
    setLoaded(true)
  }, [address, loaded])

  if (!loaded) return null
  return <Fragment>{children}</Fragment>
}
