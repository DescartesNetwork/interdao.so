import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CID } from 'ipfs-core'

import { Col, Row } from 'antd'
import MetaDataForm from '../daoInitialization/metaDataForm'
import ActionButton from './actionButton'

import IPFS from 'shared/pdb/ipfs'
import { explorer } from 'shared/util'
import configs from 'app/configs'
import { AppDispatch, AppState } from 'app/model'
import useMetaData from 'app/hooks/useMetaData'
import { setCreateDaoMetaData } from 'app/model/metadata.controller'

const {
  sol: { interDao },
} = configs

const Information = ({ daoAddress }: { daoAddress: string }) => {
  const [loading, setLoading] = useState(false)
  const {
    metadata: { createMetaData },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const metaData = useMetaData(daoAddress)

  useEffect(() => {
    dispatch(setCreateDaoMetaData(metaData))
  }, [dispatch, metaData])

  const updateMetaData = async () => {
    setLoading(true)
    try {
      const ipfs = new IPFS()
      const cid = await ipfs.set(createMetaData)
      const {
        multihash: { digest },
      } = CID.parse(cid)
      const daoMetaData = Buffer.from(digest)
      const { txId } = await interDao.updateDaoMetadata(daoMetaData, daoAddress)
      return window.notify({
        type: 'success',
        description:
          'Update information successfully. Click here to view details',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <MetaDataForm />
      </Col>
      <Col span={24}>
        <ActionButton
          onSave={updateMetaData}
          daoAddress={daoAddress}
          loading={loading}
        />
      </Col>
    </Row>
  )
}

export default Information
