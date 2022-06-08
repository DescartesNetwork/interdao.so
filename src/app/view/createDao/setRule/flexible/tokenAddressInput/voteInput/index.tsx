import VoteNftInput from './voteNftInput'
import VoteTokenInput from './voteTokenInput'

type VoteInputProps = {
  isNft: boolean
  mintAddress: string
  onMintAddressChange: (mintAddress: string) => void
  disabled: boolean
}

const VoteInput = ({
  isNft,
  mintAddress,
  onMintAddressChange,
  disabled,
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
      disabled={disabled}
    />
  )
}

export default VoteInput
