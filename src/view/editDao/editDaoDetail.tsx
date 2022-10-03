import { useEffect, useMemo, useState } from 'react'

import { Col, Row } from 'antd'
import ActionButton from './actionButton'

import { useDaoMetaData } from 'hooks/useDaoMetaData'
import FormInputDetail from 'components/formInputDetail'
import { DEFAULT_META_DATA } from 'model/createDao.controller'
import { notifyError, notifySuccess, validURL } from 'helpers'
import { ipfs } from 'helpers/ipfs'

const Information = ({ daoAddress }: { daoAddress: string }) => {
  const [loading, setLoading] = useState(false)
  const metaData = useDaoMetaData(daoAddress)
  const [nextMetadata, setNextMetadata] = useState(metaData)

  const updateMetaData = async () => {
    if (!nextMetadata) return
    try {
      setLoading(true)
      const { digest } = await ipfs.methods.daoMetadata.set(nextMetadata)

      const daoMetaData = Buffer.from(digest)
      const { txId } = await window.interDao.updateDaoMetadata(
        daoMetaData,
        daoAddress,
      )
      notifySuccess('Update information', txId)
    } catch (er: any) {
      notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  const validLink = useMemo(() => {
    if (!nextMetadata) return
    const { optionals } = nextMetadata
    if (!optionals.length) return true
    for (const link of optionals) if (!validURL(link)) return false
    return true
  }, [nextMetadata])

  useEffect(() => {
    if (!nextMetadata && metaData) setNextMetadata(metaData)
  }, [metaData, nextMetadata])

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <FormInputDetail
          metadata={nextMetadata || DEFAULT_META_DATA}
          setMetadata={setNextMetadata}
        />
      </Col>
      <Col span={24}>
        <ActionButton
          onSave={updateMetaData}
          daoAddress={daoAddress}
          loading={loading}
          disabled={!validLink}
        />
      </Col>
    </Row>
  )
}

export default Information
