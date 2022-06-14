import { useEffect, useMemo, useState } from 'react'
import { CID } from 'ipfs-core'

import { Col, Row } from 'antd'
import ActionButton from './actionButton'

import IPFS from 'shared/pdb/ipfs'
import { explorer } from 'shared/util'
import configs from 'app/configs'
import useMetaData from 'app/hooks/useMetaData'
import usePDB from 'app/hooks/usePDB'
import FormInputDetail from 'app/components/formInputDetail'
import { DEFAULT_META_DATA } from 'app/model/createDao.controller'
import { validURL } from 'app/helpers'

const {
  sol: { interDao },
} = configs

const Information = ({ daoAddress }: { daoAddress: string }) => {
  const [loading, setLoading] = useState(false)
  const { metaData } = useMetaData(daoAddress)
  const [nextMetadata, setNextMetadata] = useState(metaData)
  const pdb = usePDB()

  const updateMetaData = async () => {
    if (!nextMetadata) return
    try {
      setLoading(true)
      const ipfs = new IPFS()
      const cid = await ipfs.set(nextMetadata)
      const {
        multihash: { digest },
      } = CID.parse(cid)
      const daoMetaData = Buffer.from(digest)
      const { txId } = await interDao.updateDaoMetadata(daoMetaData, daoAddress)
      window.notify({
        type: 'success',
        description:
          'Update information successfully. Click here to view details',
        onClick: () => window.open(explorer(txId), '_blank'),
      })

      const localMetadata = { ...nextMetadata, cid } //update metadata for realtime
      return pdb.setItem(daoAddress, localMetadata)
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
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
