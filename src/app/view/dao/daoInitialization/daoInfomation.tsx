import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
import { fileToBase64 } from 'app/helpers'
import { MetaData, setInitMetadata } from 'app/model/metadata.controller'
import { AppDispatch, AppState } from 'app/model'

const DaoInformation = () => {
  const initMetadata = useSelector(
    (state: AppState) => state.metadata.initMetadata,
  )
  const dispatch = useDispatch<AppDispatch>()

  const formatMetaData = async (imgBase64: string | ArrayBuffer | null) => {
    const nextMetaData: MetaData = {
      ...initMetadata,
      image: imgBase64,
    }
    return dispatch(setInitMetadata(nextMetaData))
  }

  const onFileChange = (file: UploadChangeParam) => {
    const { fileList } = file
    const originFile = fileList[0].originFileObj as File
    fileToBase64(originFile, formatMetaData)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(setInitMetadata({ [e.target.name]: e.target.value }))

  const onOptionalChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const socials: string[] = [...initMetadata.optionals]
    socials[idx] = e.target.value
    dispatch(setInitMetadata({ optionals: socials }))
  }

  const addLink = () => {
    const socials: string[] = [...initMetadata.optionals]
    socials.push('')
    return dispatch(setInitMetadata({ optionals: socials }))
  }

  const remove = (index: number) => {
    const socials: string[] = [...initMetadata.optionals]
    socials.splice(index, 1)
    return dispatch(setInitMetadata({ optionals: socials }))
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>DAO name</Typography.Text>
          <Input
            placeholder="Input DAO name"
            onChange={onChange}
            name="daoName"
            className="border-less"
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>DAO description</Typography.Text>
          <Input.TextArea
            placeholder="Input DAO description"
            name="description"
            onChange={onChange}
            className="border-less"
          />
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical">
          <Typography.Text>Avatar</Typography.Text>
          {initMetadata.image ? (
            <Card
              className="img-card-preview-upload"
              bodyStyle={{ padding: 0, position: 'relative', height: '100%' }}
            >
              <Image
                src={initMetadata.image?.toString() || ''}
                preview={false}
              />
              <IonIcon
                className="ico-action-upload"
                name="trash-outline"
                onClick={() => dispatch(setInitMetadata({ image: '' }))}
              />
            </Card>
          ) : (
            <Upload
              className={`interdao-upload-metadata ${
                !!initMetadata.image ? 'uploaded' : ''
              }`}
              accept="image/png,image/jpg,image/webp"
              name="avatar"
              listType="picture-card"
              maxCount={1}
              onChange={onFileChange}
              onRemove={() => {
                dispatch(setInitMetadata({ image: '' }))
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
          <Typography.Text>Social media (Optional)</Typography.Text>
          <Row gutter={[8, 8]}>
            {initMetadata.optionals.map((social, index) => (
              <Col span={24} key={index}>
                <Row gutter={[12, 12]}>
                  <Col span={22}>
                    <Input
                      placeholder="Input link"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onOptionalChange(e, index)
                      }
                      className="border-less"
                    />
                  </Col>
                  <Col span={2}>
                    <Button
                      type="text"
                      icon={<IonIcon name="trash-outline" />}
                      onClick={() => remove(index)}
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

export default DaoInformation
