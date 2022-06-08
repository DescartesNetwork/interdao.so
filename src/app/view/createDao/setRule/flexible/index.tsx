import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { DaoRegimes } from '@interdao/core'
import BN from 'bn.js'

import { Button, Col, Row } from 'antd'
import RegimeInput from './regimeInput'
import TokenAddressInput from './tokenAddressInput'
import Privacy from '../privacy'
import CirculatingSupply from './circulatingSupply'

import { AppDispatch } from 'app/model'

import {
  revertPrevStep,
  submitStepSetRule,
} from 'app/model/createDao.controller'

const FlexibleDaoRule = () => {
  const [isNft, setIsNft] = useState(false)
  const [regime, setRegime] = useState(DaoRegimes.Dictatorial)
  const [mintAddress, setMintAddress] = useState('')
  const [supply, setSupply] = useState('0')
  const [isPublic, setIsPublic] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const disabled = !mintAddress || !regime

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
            <RegimeInput value={regime} onChangeRegime={setRegime} />
          </Col>
          <Col span={24}>
            <TokenAddressInput
              onMintAddressChange={setMintAddress}
              mintAddress={mintAddress}
              isNft={isNft}
              onNftChange={(isNft: boolean) => {
                setMintAddress('')
                return setIsNft(isNft)
              }}
            />
          </Col>
          <Col span={24}>
            <CirculatingSupply
              isNft={isNft}
              mintAddress={mintAddress}
              supply={supply}
              onChangeSupply={setSupply}
            />
          </Col>
          <Col span={24}>
            <Privacy isPublic={isPublic} setIsPublic={setIsPublic} />
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
