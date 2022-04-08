import { Tag } from 'antd'

import { randomColor } from 'shared/util'

type MechanismTagProps = { tag: string; special?: boolean }

const MechanismTag = ({ tag, special = false }: MechanismTagProps) => {
  const tagClass = special ? 'mechanism-tag' : 'normal-tag'

  return (
    <Tag
      className={tagClass}
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
