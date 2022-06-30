import CirculatingSupplyInput from './circulatingSupplyInput'
import CirculatingSupplyInputNFT from './circulatingSupplyInputNFT'

type CirculatingSupplyProps = {
  isNft: boolean
  mintAddress: string
  supply: string
  onChangeSupply: (supply: string) => void
}

const CirculatingSupply = ({
  isNft,
  mintAddress,
  supply,
  onChangeSupply,
}: CirculatingSupplyProps) => {
  return !isNft ? (
    <CirculatingSupplyInput
      mintAddress={mintAddress}
      value={supply}
      onChange={onChangeSupply}
    />
  ) : (
    <CirculatingSupplyInputNFT
      mintAddress={mintAddress}
      value={supply}
      onChange={onChangeSupply}
    />
  )
}

export default CirculatingSupply
