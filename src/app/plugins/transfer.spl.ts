import { utils } from '@project-serum/anchor'

const plugin = {
  name: 'transfer',
  data: {},
  accounts: {},
  programId: utils.token.TOKEN_PROGRAM_ID.toBase58(),
}

export default plugin
