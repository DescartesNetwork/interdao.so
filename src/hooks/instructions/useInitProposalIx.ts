import { web3 } from '@project-serum/anchor'
import { useCallback } from 'react'

export const useInitProposalIx = () => {
  const initProposalIx = useCallback(
    async ({
      dao,
      proposal,
      master,
      txBase64,
    }: {
      dao: string
      proposal: string
      master: string
      txBase64: string
    }) => {
      const recoveredTransaction = web3.Transaction.from(
        Buffer.from(txBase64, 'base64'),
      )
      const instructions = recoveredTransaction.instructions

      const txs = await Promise.all(
        instructions.map(async ({ data, keys, programId }) => {
          const proposalIx = web3.Keypair.generate()
          const { tx } = await window.interDao.initializeProposalInstruction({
            proposal,
            dao,
            invokedProgramAddress: programId.toBase58(),
            data,
            pubkeys: keys.map(({ pubkey }) => pubkey),
            isSigners: keys.map(({ isSigner }) => isSigner),
            isWritables: keys.map(({ isWritable }) => isWritable),
            isMasters: keys.map(({ pubkey }) => pubkey.toBase58() === master),
            proposalInstruction: proposalIx,
            sendAndConfirm: false,
          })
          return { tx, signers: [proposalIx] }
        }),
      )
      return txs
    },
    [],
  )

  return initProposalIx
}
