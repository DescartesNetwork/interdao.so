import InterDAO from '@interdao/core'
import { Utility } from '@sentre/utility'

import SafeWallet from 'app/helpers/safeWallet'
import { Net } from 'shared/runtime'

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
      'https://api.devnet.solana.com',
      '8BKoocg1ae6bzEikTSQXZThqgC7GE1bZTSZagaD2QXLm',
    ),
    utility: new Utility(new SafeWallet(), 'https://api.devnet.solana.com'),
    fee: 1000000, // 0.000005 SOL
    taxman: '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
  },

  /**
   * Staging configurations
   */
  testnet: {
    interDao: new InterDAO(new SafeWallet(), 'https://api.testnet.solana.com'),
    utility: new Utility(new SafeWallet(), 'https://api.devnet.solana.com'),
    fee: 1000000, // 0.000005 SOL
    taxman: '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
  },

  /**
   * Production configurations
   */
  mainnet: {
    interDao: new InterDAO(new SafeWallet(), 'https://ssc-dao.genesysgo.net/'),
    utility: new Utility(new SafeWallet(), 'https://ssc-dao.genesysgo.net/'),
    fee: 1000000, // 0.000005 SOL
    taxman: '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
  },
}

/**
 * Module exports
 */
export default conf
