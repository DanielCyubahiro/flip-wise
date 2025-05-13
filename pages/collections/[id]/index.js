import { useRouter } from 'next/router'
import useSWR from 'swr'
import { StyledH1 } from '@/component/StyledHeadings'
import Card from '@/component/Card'
import { StyledWrapper } from '@/component/StyledWrapper'
import { useState } from 'react'
import StyledAlert from '@/component/StyledAlert'

export default function CollectionDetailPage({ fetcher }) {
  const router = useRouter()
  const { id } = router.query
  const { data: cards, isLoading, error } = useSWR(id ? `/api/collections/${id}` : null)
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info',
  })
  if (isLoading) return <div>Loading cards...</div>
  if (error) return <div>Error loading cards: {error.message}</div>
  if (!cards) return <div>No cards available. Please insert new cards...</div>

  const handleDelete = async (id) => {
    const response = await fetch(`/api/cards/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      setAlert({
        show: true,
        message: 'Card deleted successfully!',
        type: 'success',
      })
      mutate()
    } else {
      setAlert({
        show: true,
        message: 'Could not delete card!',
        type: 'error',
      })
    }
  }

  return (
    <StyledWrapper>
      {alert.show && (
        <StyledAlert
          message={alert.message}
          type="success"
          onClose={() => setAlert({ ...alert, show: false })}
          duration={3000}
        />
      )}
      <StyledH1>{cards[0]?.collectionId.title}</StyledH1>
      {cards.map((card) => (
        <Card
          key={card._id}
          question={card.question}
          answer={card.answer}
          showCollectionName={false}
          onDelete={handleDelete}
        ></Card>
      ))}
    </StyledWrapper>
  )
}
