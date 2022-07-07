import { Fragment } from 'react'

import { Avatar, Card, List, Skeleton } from 'antd'

type CardLoadingProps = { loading: boolean }
const CardLoading = ({ loading }: CardLoadingProps) => {
  if (!loading) return <Fragment />

  return (
    <Card
      style={{
        borderWidth: '0 0 1px 0',
        borderRadius: 0,
        background: 'transparent',
      }}
      bodyStyle={{
        padding: '0 0 24px 0',
      }}
    >
      <Skeleton loading={true} active avatar>
        <List.Item.Meta avatar={<Avatar />} title={''} description={''} />
      </Skeleton>
    </Card>
  )
}

export default CardLoading
