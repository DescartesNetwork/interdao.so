import { ChangeEvent } from 'react'

import { Col, Input, Row, Space, Typography, Upload } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { UploadChangeParam } from 'antd/lib/upload'
import { fileToBase64 } from 'app/helpers'

export type MetaData = {
  daoName: string
  description: string
  image: string | ArrayBuffer | null
}

type MetaDataFormProps = {
  metaData: MetaData
  setMetaData: (data: MetaData) => void
}

const MetaDataForm = ({ metaData, setMetaData }: MetaDataFormProps) => {
  const formatMetaData = async (imgBase64: string | ArrayBuffer | null) => {
    const nextMetaData: MetaData = {
      ...metaData,
      image: imgBase64,
    }
    setMetaData(nextMetaData)
  }

  const onFileChange = (file: UploadChangeParam) => {
    const { fileList } = file
    const originFile = fileList[0].originFileObj as File
    fileToBase64(originFile, formatMetaData)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMetaData({ ...metaData, [e.target.name]: e.target.value })
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
            onChange={onFileChange}
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
              value={metaData.daoName}
              onChange={onChange}
              name="daoName"
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
            <Input
              value={metaData.description}
              name="description"
              onChange={onChange}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default MetaDataForm
