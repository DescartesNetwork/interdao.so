import { Fragment, useCallback, useState } from 'react'
import { Transaction } from '@solana/web3.js'

import { Button, Col, Input, Modal, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useCommentProposal } from 'hooks/useCommentProposal'
import { notifyError, notifySuccess } from 'helpers'
import { useAnchorProvider } from 'hooks/useAnchorProvider'

const ActionCommentOnly = () => {
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState('')
  const { initTxCommentProposal } = useCommentProposal()
  const provider = useAnchorProvider()

  const addComments = useCallback(async () => {
    try {
      if (!value) throw new Error('Invalid comments.')
      const transaction = new Transaction()
      const txComment = await initTxCommentProposal('', value)
      transaction.add(txComment)
      const txId = await provider.sendAndConfirm(txComment)
      notifySuccess('comment', txId)
    } catch (err) {
      notifyError(err)
    }
  }, [initTxCommentProposal, provider, value])

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
            <Typography.Title level={5}>Add a comment oly</Typography.Title>
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
                  <Button type="primary" onClick={addComments}>
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
