import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Card, CardProps } from 'antd'

import { AppState } from 'app/model'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

type PropProposalTemplateCard = {
  proposalAddress: string
} & CardProps

const ProposalTemplateCard: React.FC<PropProposalTemplateCard> = ({
  proposalAddress,
  ...rest
}) => {
  const history = useHistory()
  const proposalData = useSelector(
    (state: AppState) => state.proposal[proposalAddress],
  )

  const daoAddress = proposalData.dao.toBase58()
  return (
    <Card
      bordered={false}
      onClick={() =>
        history.push(
          `/app/${appId}/dao/${daoAddress}/proposal/${proposalAddress}`,
        )
      }
      className="proposal-card"
      bodyStyle={{ padding: '24px 0', minHeight: 150 }}
      hoverable
      {...rest}
    >
      {rest.children}
    </Card>
  )
}

export default ProposalTemplateCard
