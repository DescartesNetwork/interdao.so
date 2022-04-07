import { Tag } from 'antd'

import { randomColor } from 'shared/util'

const MechanismTag = ({ tag }: { tag: string }) => {
  return (
    <Tag
      className="mechanism-tag"
      style={{
        color: randomColor(tag),
      }}
      color={randomColor(tag, 0.2)}
    >
      {tag}
    </Tag>
  )
}

export default MechanismTag
