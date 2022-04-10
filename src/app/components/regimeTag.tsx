import { Tag } from 'antd'

import { randomColor } from 'shared/util'

export type RegimeTagProps = { tag: string }

const RegimeTag = ({ tag }: RegimeTagProps) => {
  return (
    <Tag
      style={{
        color: randomColor(tag),
      }}
      color={randomColor(tag, 0.2)}
    >
      {tag}
    </Tag>
  )
}

export default RegimeTag
