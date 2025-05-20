import { useRouter } from 'next/router'
import useSWR from 'swr'
import { StyledH1 } from '@/components/StyledH1'
import { StyledWrapper } from '@/components/StyledWrapper'
import StyledAlert from '@/components/StyledAlert'
import { useAlert } from '@/hooks/useAlert'
import CardList from '@/components/CardList'
import {DeleteCard} from '@/utils/DeleteCard';
import SideMenu from '@/components/SideMenu';
import Form from '@/components/Form';
import {useState} from 'react';
import {CreateCard} from '@/utils/CreateCard';
import {useSession} from 'next-auth/react';
import Navigation from '@/components/Navigation';

export default function CollectionDetailPage() {
  const { status } = useSession();
  const router = useRouter()
  const { id } = router.query
  const { data: cards, isLoading, error, mutate } = useSWR(id ? `/api/collections/${id}` : null)
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
      <StyledH1>{cards[0]?.collectionId.title}</StyledH1>
      {showForm && <Form onSubmit={handleSubmit} />}
      {status === 'authenticated' && <SideMenu onCreate={setShowForm}/>}
      <CardList cards={cards} onDelete={handleDelete} fromAllCardsPage={false} />
      <Navigation/>
    </StyledWrapper>
  )
}
