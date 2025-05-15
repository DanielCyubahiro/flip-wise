import useSWR from 'swr'
import { StyledH1 } from '@/components/StyledH1'
import { StyledWrapper } from '@/components/StyledWrapper'
import StyledAlert from '@/components/StyledAlert'
import Form from '@/components/Form'
import { useAlert } from '@/hooks/useAlert'
import CardList from '@/components/CardList'
import {DeleteCard} from '@/utils/DeleteCard';
import SideMenu from '@/components/SideMenu';

export default function HomePage({ fetcher }) {
  const { data: cards, isLoading, error, mutate } = useSWR('/api/cards', fetcher)
  const { alert, triggerAlert, closeAlert } = useAlert()

  const handleDelete = DeleteCard(mutate, triggerAlert)

  const handleSubmit = async (newCard) => {
    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      })

      if (response.ok) {
        await mutate()
      }
    } catch (error) {
      console.error('Your card could not be added', error)
    }
  }
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
      <Form onSubmit={handleSubmit} />
     <SideMenu/>
      <CardList cards={cards} onDelete={handleDelete} showCollectionName={true} />
    </StyledWrapper>
  )
}
