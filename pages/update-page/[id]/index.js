import { useRouter } from 'next/router'
import { StyledH1 } from '@/components/StyledH1'
import { StyledWrapper } from '@/components/StyledWrapper'
import Form from '@/components/Form'
import { useEffect, useState } from 'react'

export default function UpdateDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [cardData, setCardData] = useState(null)

  useEffect(() => {
    if (!id) return

    async function fetchCard() {
      try {
        const response = await fetch(`/api/cards/${id}`)
        const data = await response.json()
        setCardData(data)
      } catch (error) {
        console.error('Failed to fetch card data', error)
      }
    }

    fetchCard()
  }, [id])

  const handleReturn = () => {
    router.push('/cards')
  }

  const handleUpdate = async (updatedCard) => {
    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCard),
      })

      if (!response.ok) {
        throw new Error('Failed to update')
      }

      router.push('/cards')
    } catch (error) {
      console.error('Failed to update card', error)
    }
  }

  return (
    <StyledWrapper>
      <StyledH1>Update Page</StyledH1>
      {cardData ? (
        <Form
          showUpdate={true}
          onReturnClick={handleReturn}
          onSubmit={handleUpdate}
          initialData={cardData}
        />
      ) : (
        <p>Loading...</p>
      )}
    </StyledWrapper>
  )
}
