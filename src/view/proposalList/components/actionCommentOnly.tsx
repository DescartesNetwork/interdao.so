import { Fragment, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Button, Col, Input, Modal, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useCommentProposal } from 'hooks/useCommentProposal'
import { notifyError, notifySuccess } from 'helpers'
import { useAnchorProvider } from 'hooks/useAnchorProvider'

const ActionCommentOnly = () => {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState('')
  const { initTxCommentProposal } = useCommentProposal()
  const provider = useAnchorProvider()
  const { proposalAddress } = useParams<{
    proposalAddress: string
  }>()

  const addComments = useCallback(async () => {
    try {
      if (!value || !account.isAddress(proposalAddress))
        throw new Error('Invalid comments.')
      setLoading(true)
      const txComment = await initTxCommentProposal({
        proposal: proposalAddress,
        content: value,
      })
      const txId = await provider.sendAndConfirm(txComment)

      setVisible(false)
      notifySuccess('comment', txId)
    } catch (err) {
      notifyError(err)
    } finally {
      setLoading(false)
    }
  }, [initTxCommentProposal, proposalAddress, provider, value])

  return (
    <Fragment>
      <Button
        icon={<IonIcon name="add-outline" />}
        onClick={() => setVisible(true)}
      >
        Add a comment only
      </Button>

      {/* Modal add comment only */}
      <Modal
        footer={false}
        visible={visible}
        onCancel={() => setVisible(false)}
        closeIcon={<IonIcon name="close-outline" />}
      >
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <Typography.Title level={5}>Add a comment only</Typography.Title>
          </Col>
          <Col span={24}>
            <Row gutter={[24, 24]} justify="end">
              <Col span={24}>
                <Input.TextArea
                  placeholder="Your throughts"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Col>
              <Col>
                <Space>
                  <Button onClick={() => setVisible(false)}>Cancel</Button>
                  <Button
                    type="primary"
                    onClick={addComments}
                    loading={loading}
                  >
                    Add
                  </Button>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default ActionCommentOnly
