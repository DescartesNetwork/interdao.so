import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BN from 'bn.js'

import { Button, Col, Row } from 'antd'
import RegimeInput from './regimeInput'
import TokenAddressInput from './tokenAddressInput'
import Privacy from '../privacy'
import CirculatingSupply from './circulatingSupply'

import { AppDispatch, AppState } from 'app/model'

import {
  revertPrevStep,
  submitStepSetRule,
} from 'app/model/createDao.controller'

const FlexibleDaoRule = () => {
  const { isNft, isPublic, mintAddress, supply, regime } = useSelector(
    (state: AppState) => state.createDao.data,
  )
  const [nextIsNft, setIsNft] = useState(isNft)
  const [nextRegime, setRegime] = useState(regime)
  const [nextMintAddress, setMintAddress] = useState(mintAddress)
  const [nextSupply, setSupply] = useState(supply.toString())
  const [nextIsPublic, setIsPublic] = useState(isPublic)
  const dispatch = useDispatch<AppDispatch>()

  const disabled = !nextMintAddress || !nextRegime

  const onNextStep = () => {
    return dispatch(
      submitStepSetRule({
        rule: { isNft, regime, supply: new BN(supply), isPublic, mintAddress },
      }),
    )
  }

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <RegimeInput value={nextRegime} onChangeRegime={setRegime} />
          </Col>
          <Col span={24}>
            <TokenAddressInput
              onMintAddressChange={setMintAddress}
              mintAddress={nextMintAddress}
              isNft={nextIsNft}
              onNftChange={(isNft: boolean) => {
                setMintAddress('')
                return setIsNft(isNft)
              }}
            />
          </Col>
          <Col span={24}>
            <CirculatingSupply
              isNft={isNft}
              mintAddress={nextMintAddress}
              supply={nextSupply}
              onChangeSupply={setSupply}
            />
          </Col>
          <Col span={24}>
            <Privacy isPublic={nextIsPublic} setIsPublic={setIsPublic} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <Button
              type="text"
              size="large"
              onClick={() => dispatch(revertPrevStep())}
            >
              Back
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              disabled={disabled}
              onClick={onNextStep}
            >
              Continue
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default FlexibleDaoRule
