import { useRouter } from 'next/router'
import { StyledH1 } from '@/components/StyledH1'
import { StyledWrapper } from '@/components/StyledWrapper'
import Form from '@/components/Form'

export default function UpdateDetailPage() {
  const router = useRouter()

  const handleReturn = () => {
    router.push('/cards')
  }

  return (
    <StyledWrapper>
      <StyledH1>Update Page</StyledH1>
      <Form showUpdate={true} onReturnClick={handleReturn} />
    </StyledWrapper>
  )
}
