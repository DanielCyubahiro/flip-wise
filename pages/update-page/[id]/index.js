import { useRouter } from 'next/router'
import { StyledH1 } from '@/components/StyledH1'
import { StyledWrapper } from '@/components/StyledWrapper'
import Form from '@/components/Form'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((response) => response.json())

export default function UpdateDetailPage() {
  const router = useRouter()
  const { id } = router.query

  const { data } = useSWR(`/api/cards/${id}`, fetcher)

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
      {data ? (
        <Form
          showUpdate={true}
          onReturnClick={handleReturn}
          onSubmit={handleUpdate}
          initialData={data}
        />
      ) : (
        <p>Loading...</p>
      )}
    </StyledWrapper>
  )
}
