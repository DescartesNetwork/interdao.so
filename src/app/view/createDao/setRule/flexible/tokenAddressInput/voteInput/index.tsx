import VoteNftInput from './voteNftInput'
import VoteTokenInput from './voteTokenInput'

type VoteInputProps = {
  isNft: boolean
  mintAddress: string
  onMintAddressChange: (mintAddress: string) => void
}

const VoteInput = ({
  isNft,
  mintAddress,
  onMintAddressChange,
}: VoteInputProps) => {
  return isNft ? (
    <VoteNftInput
      mintAddress={mintAddress}
      onMintAddressChange={onMintAddressChange}
    />
  ) : (
    <VoteTokenInput
      mintAddress={mintAddress}
      onMintAddressChange={onMintAddressChange}
    />
  )
}

export default VoteInput
