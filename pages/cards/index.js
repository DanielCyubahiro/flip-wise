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
import Navigation from '@/components/Navigation';
import {getSession} from 'next-auth/react';

export default function AllCardsList({ isAuthenticated}) {
  const { data: cards, isLoading, error, mutate } = useSWR('/api/cards')
  const { alert, triggerAlert, closeAlert } = useAlert()
  const [showForm, setShowForm] = useState(false)

  if (!isAuthenticated) {
    return null
  }

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
      <StyledH1>All Cards List</StyledH1>
      {showForm && <Form onSubmit={handleSubmit} />}
     <SideMenu onCreate={setShowForm} />
      <CardList cards={cards} onDelete={handleDelete} fromAllCardsPage={true} />
      <Navigation/>
    </StyledWrapper>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: `/?callbackUrl=${encodeURIComponent(context.resolvedUrl)}`,
        permanent: false,
      }
    }
  }

  return {
    props: {
      isAuthenticated: !!session,
    }
  }
}