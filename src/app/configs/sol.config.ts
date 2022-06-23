import InterDAO from '@interdao/core'
import { Utility } from '@sentre/utility'

import SafeWallet from 'app/helpers/safeWallet'
import { Net, rpc } from 'shared/runtime'

/**
 * Contructor
 */
type Conf = {
  interDao: InterDAO
  utility: Utility
  fee: number
  taxman: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    interDao: new InterDAO(
      new SafeWallet(),
      rpc,
      'BND6UZZG2rLGtaYLioBtXFnrBtvtp5g6YXWKEc4LLqrJ',
    ),
    utility: new Utility(new SafeWallet(), rpc),
    fee: 1000000, // 0.001 SOL
    taxman: '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
  },

  /**
   * Staging configurations
   */
  testnet: {
    interDao: new InterDAO(new SafeWallet(), rpc),
    utility: new Utility(new SafeWallet(), rpc),
    fee: 1000000, // 0.001 SOL
    taxman: '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
  },

  /**
   * Production configurations
   */
  mainnet: {
    interDao: new InterDAO(
      new SafeWallet(),
      rpc,
      'Cf9aesANCGv35NsqtGpJ4d3M7wKrcPLiGDLUxYPtaEab',
    ),
    utility: new Utility(new SafeWallet(), rpc),
    fee: 1000000, // 0.001 SOL
    taxman: '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
  },
}

/**
 * Module exports
 */
export default conf
