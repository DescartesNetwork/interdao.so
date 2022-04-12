import InterDAO from '@interdao/core'
import SafeWallet from 'app/helpers/safeWallet'
import { Net } from 'shared/runtime'

/**
 * Contructor
 */
type Conf = {
  rpc: string
  interDao: InterDAO
  fee: string
  taxman: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    rpc: 'https://api.devnet.solana.com',
    interDao: new InterDAO(new SafeWallet()),
    fee: '0',
    taxman: '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
  },

  /**
   * Staging configurations
   */
  testnet: {
    rpc: 'https://api.testnet.solana.com',
    interDao: new InterDAO(new SafeWallet()),
    fee: '0',
    taxman: '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
  },

  /**
   * Production configurations
   */
  mainnet: {
    rpc: 'https://ssc-dao.genesysgo.net',
    interDao: new InterDAO(new SafeWallet()),
    fee: '0',
    taxman: '',
  },
}

/**
 * Module exports
 */
export default conf
