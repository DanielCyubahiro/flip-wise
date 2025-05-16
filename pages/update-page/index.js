import Form from '@/components/Form'
import { StyledWrapper } from '@/components/StyledWrapper'
import { StyledH1 } from '@/components/StyledH1'
import { useRouter } from 'next/router'

export default function UpdatePage() {
  const router = useRouter()

  const handleReturn = () => {
    router.push('/cards')
  }

  return (
    <StyledWrapper>
      <StyledH1>Update Page</StyledH1>
      <Form showUpdate={true} onReturnClick={handleReturn}></Form>
    </StyledWrapper>
  )
}
