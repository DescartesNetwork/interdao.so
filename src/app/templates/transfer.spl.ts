import { utils } from '@project-serum/anchor'
import { BN } from 'bn.js'

const plugin = {
  name: 'transfer',
  data: {
    code: 3,
    amount: new BN(0),
  },
  accounts: {
    src: {
      pubkey: null,
      prevIsWritable: true,
      prevIsSigner: false,
      nextIsWritable: true,
      nextIsSigner: false,
    },
    dst: {
      pubkey: null,
      prevIsWritable: true,
      prevIsSigner: false,
      nextIsWritable: true,
      nextIsSigner: false,
    },
    payer: {
      pubkey: null,
      prevIsWritable: true,
      prevIsSigner: false,
      nextIsWritable: true,
      nextIsSigner: true,
    },
  },
  programId: utils.token.TOKEN_PROGRAM_ID,
}

export default plugin
