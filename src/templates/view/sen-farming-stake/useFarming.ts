import { useCallback } from 'react'
import { net, useGetMintDecimals } from '@sentre/senhub'
import { web3, BN, AnchorProvider } from '@project-serum/anchor'
import { utilsBN } from '@sen-use/web3'
import SenFarming, { DebtData } from '@sentre/farming'

import { conf } from './configs'

type StakeProps = {
  farm: web3.PublicKey
  inAmount: number
  walletPublicKey: web3.PublicKey // Master
}

export const useFarming = () => {
  const getMintDecimals = useGetMintDecimals()

  const getSenFarming = useCallback((walletPublicKey: web3.PublicKey) => {
    const programId = conf[net].senFarmingProgram
    const provider = new AnchorProvider(
      window.sentre.splt.connection,
      { ...window.sentre.wallet, publicKey: walletPublicKey },
      {},
    )
    return new SenFarming(provider, programId)
  }, [])

  const stake = useCallback(
    async ({ inAmount, farm, walletPublicKey }: StakeProps) => {
      const senFarming = getSenFarming(walletPublicKey)
      const farmData = await senFarming.program.account.farm.fetch(farm)
      //
      const PDAs = await senFarming.deriveAllPDAs({
        farm,
      })
      const decimals = await getMintDecimals({
        mintAddress: farmData.inputMint.toBase58(),
      })

      let debtData: DebtData | null = null
      try {
        debtData = await senFarming.program.account.debt.fetch(PDAs.debt)
      } catch (error) {}

      // Validate
      const listTxs: web3.Transaction[] = []
      const depositAmount = !debtData ? new BN(0) : debtData.shares
      const leverage = !debtData ? new BN(1) : debtData.leverage

      // Initialize debt if needed
      if (!debtData) {
        const { tx } = await senFarming.initializeDebt({
          farm,
          sendAndConfirm: false,
        })
        listTxs.push(tx)
      }

      // Unstake + Withdraw all
      const txUnstakeWithdraw = new web3.Transaction()
      const { tx: txUnstake } = await senFarming.unstake({
        farm,
        sendAndConfirm: false,
      })

      const { tx: txWithdraw } = await senFarming.withdraw({
        farm,
        shares: depositAmount,
        sendAndConfirm: false,
      })
      txUnstakeWithdraw.add(txUnstake)
      txUnstakeWithdraw.add(txWithdraw)

      // Calc amountBN deposit
      const amountBN = utilsBN.decimalize(inAmount, decimals!)
      const oldAmount = depositAmount.mul(new BN(10 ** 9)).div(leverage)

      // Deposit + Stake
      const txDepositStake = new web3.Transaction()
      const { tx: txDeposit } = await senFarming.deposit({
        farm,
        inAmount: amountBN.add(oldAmount),
        sendAndConfirm: false,
      })
      const { tx: txStake } = await senFarming.stake({
        farm,
        sendAndConfirm: false,
      })
      txDepositStake.add(txDeposit)
      txDepositStake.add(txStake)
      listTxs.push(txDepositStake)

      return listTxs
    },
    [getMintDecimals, getSenFarming],
  )

  return { stake, getSenFarming }
}
