import isEqual from 'react-fast-compare'
import { DaoRegime } from '@interdao/core'

import { Card, Image, Typography } from 'antd'

import autonomous from 'app/static/images/system/bg-autonomous.png'
import democratic from 'app/static/images/system/bg-democratic.png'
import dictatorial from 'app/static/images/system/bg-dictatorial.png'
import { DaoCardBackground } from '../../daoList/daoCard'

const DAO_CARD_BG = {
  autonomous,
  democratic,
  dictatorial,
}

const CardRegmie = ({
  value,
  regmie,
  onChange = () => {},
}: {
  value?: DaoRegime
  regmie: DaoRegime
  onChange?: (regmie: DaoRegime) => void
}) => {
  return (
    <Card
      bordered={false}
      style={{ overflow: 'hidden', cursor: 'pointer' }}
      bodyStyle={{ padding: 0 }}
      onClick={() => onChange(regmie)}
      className={`card-regime ${isEqual(value, regmie) ? 'active' : ''}`}
    >
      <Image
        src={DAO_CARD_BG[Object.keys(regmie)[0] as DaoCardBackground]}
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
        {Object.keys(regmie)[0]}
      </Typography.Text>
    </Card>
  )
}

export default CardRegmie
