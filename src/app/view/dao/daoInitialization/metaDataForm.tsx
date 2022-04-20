import { useState } from 'react'

import { Col, Input, Row, Space, Typography, Upload, Button, Image } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { UploadChangeParam } from 'antd/lib/upload'
import { fileToBase64 } from 'app/helpers'
import IPFS from 'shared/pdb/ipfs'

const MetaDataForm = () => {
  const [loading, setLoading] = useState(false)
  const [daoName, setDaoName] = useState('')
  const [daoDesc, setDaoDesc] = useState('')
  const [img, setImg] = useState('')
  const [cid, setCID] = useState('')
  const [fileList, setFileList] = useState<UploadChangeParam>()

  const getMetaData = async () => {
    if (!cid) return
    const ipfs = new IPFS()
    setLoading(true)
    try {
      const metaData = await ipfs.get(cid)
      setImg(metaData.image)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const sendToIPFS = async (imgBase64: string | ArrayBuffer | null) => {
    const ipfs = new IPFS()

    const metaData = {
      name: daoName,
      description: daoDesc,
      image: imgBase64,
    }

    const cid = await ipfs.set(metaData)
    setCID(cid)
  }

  const setMetaData = async () => {
    setLoading(true)
    try {
      const file = fileList?.fileList[0].originFileObj as File
      await fileToBase64(file, sendToIPFS)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space direction="vertical">
          <Typography.Text>Avatar</Typography.Text>
          <Upload
            name="avatar"
            listType="picture-card"
            maxCount={1}
            showUploadList
            onChange={setFileList}
          >
            <IonIcon name="add-outline" />
          </Upload>
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Typography.Text>Dao name</Typography.Text>
          </Col>
          <Col span={24}>
            <Input
              value={daoName}
              onChange={(e) => setDaoName(e.target.value)}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Typography.Text>Dao description</Typography.Text>
          </Col>
          <Col span={24}>
            <Input.TextArea
              value={daoDesc}
              onChange={(e) => setDaoDesc(e.target.value)}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Space>
          <Button type="primary" onClick={setMetaData}>
            Set MetaData
          </Button>
          <Button type="primary" onClick={getMetaData} loading={loading}>
            Get Image
          </Button>
        </Space>
      </Col>
      {img && (
        <Col span={24}>
          <Image src={img} preview={false} />
        </Col>
      )}
    </Row>
  )
}

export default MetaDataForm
