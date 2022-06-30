import { ChangeEvent } from 'react'

import {
  Button,
  Card,
  Col,
  Image,
  Input,
  Row,
  Space,
  Typography,
  Upload,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { UploadChangeParam } from 'antd/lib/upload'
import { fileToBase64 } from 'helpers'
import { MetaData } from 'model/createDao.controller'

type FormInputDetailProps = {
  metadata: MetaData
  setMetadata: (metadata: MetaData) => void
}

const FormInputDetail = ({ metadata, setMetadata }: FormInputDetailProps) => {
  const formatMetaData = async (imgBase64: string | ArrayBuffer | null) => {
    const nextMetaData: MetaData = {
      ...metadata,
      image: imgBase64,
    }
    return setMetadata(nextMetaData)
  }

  const onFileChange = (file: UploadChangeParam) => {
    const { fileList } = file
    const originFile = fileList[0].originFileObj as File
    fileToBase64(originFile, formatMetaData)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setMetadata({ ...metadata, [e.target.name]: e.target.value })

  const onOptionalChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const socials: string[] = [...metadata.optionals]
    socials[idx] = e.target.value
    return setMetadata({ ...metadata, optionals: socials })
  }

  const addLink = () => {
    const socials: string[] = [...metadata.optionals]
    socials.push('')
    return setMetadata({ ...metadata, optionals: socials })
  }

  const removeLink = (index: number) => {
    const socials: string[] = [...metadata.optionals]
    socials.splice(index, 1)
    return setMetadata({ ...metadata, optionals: socials })
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>DAO Name</Typography.Text>
          <Input
            placeholder="Input DAO name"
            onChange={onChange}
            name="daoName"
            className="border-less"
            value={metadata.daoName}
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>DAO Description</Typography.Text>
          <Input.TextArea
            placeholder="Input DAO description"
            name="description"
            onChange={onChange}
            className="border-less"
            value={metadata.description}
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical">
          <Typography.Text>Avatar</Typography.Text>
          {metadata.image ? (
            <Card
              className="img-card-preview-upload"
              bodyStyle={{
                padding: 0,
                position: 'relative',
                height: '100%',
              }}
            >
              <Image src={metadata.image?.toString() || ''} preview={false} />
              <IonIcon
                className="ico-action-upload"
                name="trash-outline"
                onClick={() => setMetadata({ ...metadata, image: '' })}
              />
            </Card>
          ) : (
            <Upload
              className={`interdao-upload-metadata ${
                !!metadata.image ? 'uploaded' : ''
              }`}
              accept="image/png,image/jpg,image/webp"
              name="avatar"
              listType="picture-card"
              maxCount={1}
              onChange={onFileChange}
              onRemove={() => {
                setMetadata({ ...metadata, image: '' })
                return true
              }}
            >
              <Space direction="vertical" size={0}>
                <Typography.Text style={{ fontSize: 24 }}>
                  <IonIcon name="cloud-upload-outline" />
                </Typography.Text>
                <Typography.Text type="secondary" style={{ fontSize: 10 }}>
                  Support JPG, PNG
                </Typography.Text>
              </Space>
            </Upload>
          )}
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>Social Media (Optional)</Typography.Text>
          <Row gutter={[8, 8]}>
            {metadata.optionals.map((social, index) => (
              <Col span={24} key={index}>
                <Row gutter={[12, 12]}>
                  <Col span={22}>
                    <Input
                      placeholder="Input link"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onOptionalChange(e, index)
                      }
                      className="border-less"
                      value={social}
                    />
                  </Col>
                  <Col span={2}>
                    <Button
                      type="text"
                      icon={<IonIcon name="trash-outline" />}
                      onClick={() => removeLink(index)}
                    />
                  </Col>
                </Row>
              </Col>
            ))}
            <Col span={24}>
              <Button
                type="dashed"
                icon={<IonIcon name="add-outline" />}
                onClick={addLink}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Space>
      </Col>
    </Row>
  )
}

export default FormInputDetail
