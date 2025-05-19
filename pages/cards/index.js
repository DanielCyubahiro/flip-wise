import useSWR from 'swr'
import { StyledH1 } from '@/components/StyledH1'
import { StyledWrapper } from '@/components/StyledWrapper'
import StyledAlert from '@/components/StyledAlert'
import Form from '@/components/Form'
import { useAlert } from '@/hooks/useAlert'
import CardList from '@/components/CardList'
import {DeleteCard} from '@/utils/DeleteCard';
import SideMenu from '@/components/SideMenu';
import {useState} from 'react';
import {CreateCard} from '@/utils/CreateCard';
import {useSession} from 'next-auth/react';
import HomePage from '@/pages';
import Logout from '@/components/Logout';

export default function AllCardsList({ fetcher }) {
  const { status } = useSession();
  if (status === 'unauthenticated') {
    return <HomePage/>
  }
  const { data: cards, isLoading, error, mutate } = useSWR('/api/cards', fetcher)
  const { alert, triggerAlert, closeAlert } = useAlert()
  const [showForm, setShowForm] = useState(false)

  const handleDelete = DeleteCard(mutate, triggerAlert)
  const handleSubmit = CreateCard(mutate, setShowForm)

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
      {status === 'authenticated' && (
          <Logout/>
      )}
      <StyledH1>All Cards List</StyledH1>
      {showForm && <Form onSubmit={handleSubmit} />}
     <SideMenu onCreate={setShowForm} />
      <CardList cards={cards} onDelete={handleDelete} showCollectionName={true} />
    </StyledWrapper>
  )
}
