import useSWR from 'swr'
import { StyledH1 } from '@/component/StyledHeadings'
import { StyledWrapper } from '@/component/StyledWrapper'
import StyledAlert from '@/component/StyledAlert'
import { useAlert } from '@/hooks/useAlert'
import CardList from '@/component/CardList'
import {DeleteCard} from '@/utils';

export default function HomePage({ fetcher }) {
  const { data: cards, isLoading, error, mutate } = useSWR('/api/cards', fetcher)
  const { alert, triggerAlert, closeAlert } = useAlert()

  const handleDelete = DeleteCard(mutate, triggerAlert)

  return isLoading ? (
    <div>Loading cards...</div>
  ) : error ? (
    <div>Failed to load cards. Error: {error.message}</div>
  ) : !cards || cards.length === 0 ? (
    <div>No cards available. Please insert new cards...</div>
  ) : (
    <StyledWrapper>
      {alert.show && (
        <StyledAlert
          message={alert.message}
          type={alert.type}
          onClose={closeAlert}
          duration={3000}
        />
      )}
      <StyledH1>All Cards List</StyledH1>
      <CardList cards={cards} onDelete={handleDelete} showCollectionName={true} />
    </StyledWrapper>
  )
}
