import { InvokedAccount } from '@interdao/core'
import { Card, Col, Row, Space, Tag, Typography } from 'antd'
import { ShortenAddress } from 'components/shortenAddress'
import React, { useCallback, useEffect, useState } from 'react'

export const ProposalExplorer = ({
  proposalAddress,
}: {
  proposalAddress: string
}) => {
  const [instructions, setInstructions] = useState<
    Awaited<ReturnType<typeof getInstructions>>
  >([])

  const getInstructions = useCallback(async () => {
    const instructions =
      await window.interDao.program.account.proposalInstruction.all([
        { memcmp: { offset: 8, bytes: proposalAddress } },
      ])
    const sortedInstructions = instructions.sort(
      (a, b) => Number(a.account.index) - Number(b.account.index),
    )
    setInstructions(sortedInstructions)
    return sortedInstructions
  }, [proposalAddress])

  useEffect(() => {
    getInstructions()
  }, [getInstructions])

  return (
    <Row gutter={[16, 16]}>
      {instructions.map((ix) => (
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Typography.Title level={5}>
                #{Number(ix.account.index) + 1} Instruction:
              </Typography.Title>
              <ShortenAddress address={ix.publicKey.toBase58()} size={8} />
            </Space>
            <Card>
              <Row gutter={[12, 12]}>
                {/* Instruction Program */}
                <Col span={24}>
                  <Space>
                    <Typography.Title level={5}>Program:</Typography.Title>
                    <ShortenAddress
                      address={ix.account.invokedProgram.toBase58()}
                      size={8}
                    />
                  </Space>
                </Col>
                {/* Instruction Data */}
                <Col span={24}>
                  <Space wrap>
                    <Typography.Title level={5}>Data:</Typography.Title>
                    <Typography.Text>
                      {JSON.stringify(
                        Array.from(ix.account.data as number[]),
                        null,
                        4,
                      )}
                    </Typography.Text>
                  </Space>
                </Col>
                {/* Instruction Meta Accounts */}
                <Col span={24}>
                  <Space direction="vertical">
                    <Typography.Title level={5}>Accounts:</Typography.Title>
                    {(ix.account.accounts as InvokedAccount[]).map(
                      (acc, idx) => {
                        return (
                          <Space>
                            <Typography.Text>#{idx + 1}</Typography.Text>
                            <ShortenAddress
                              address={acc.pubkey.toBase58()}
                              size={4}
                            />
                            <span>
                              {acc.isSigner && <Tag color="orange">Signer</Tag>}
                              {acc.isMaster && (
                                <Tag color="magenta">Master</Tag>
                              )}
                              {acc.isWritable && (
                                <Tag color="blue">Writable</Tag>
                              )}
                            </span>
                          </Space>
                        )
                      },
                    )}
                  </Space>
                </Col>
              </Row>
            </Card>
          </Space>
        </Col>
      ))}
    </Row>
  )
}
