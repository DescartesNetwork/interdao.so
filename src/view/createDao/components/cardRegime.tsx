import { DaoRegime } from '@interdao/core'

import { Card, Image, Typography } from 'antd'

import autonomous from 'static/images/system/bg-autonomous.png'
import democratic from 'static/images/system/bg-democratic.png'
import dictatorial from 'static/images/system/bg-dictatorial.png'
import { DaoCardBackground } from '../../dao/publicDaos/daoCard'

const DAO_CARD_BG = {
  autonomous,
  democratic,
  dictatorial,
}

const CardRegime = ({
  regime,
  onChange = () => {},
  active = true,
}: {
  regime: DaoRegime
  onChange?: (regime: DaoRegime) => void
  active?: boolean
}) => {
  return (
    <Card
      bordered={false}
      style={{ overflow: 'hidden', cursor: 'pointer' }}
      bodyStyle={{ padding: 0 }}
      onClick={() => onChange(regime)}
      className={`card-regime ${active ? 'active' : ''}`}
    >
      <Image
        src={DAO_CARD_BG[Object.keys(regime)[0] as DaoCardBackground]}
        preview={false}
      />
      <Typography.Text
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          textAlign: 'center',
          width: '100%',
          padding: 4,
          backdropFilter: 'blur(4px)',
          color: '#fff',
          textTransform: 'capitalize',
          fontWeight: 400,
        }}
      >
        {Object.keys(regime)[0]}
      </Typography.Text>
    </Card>
  )
}

export default CardRegime
