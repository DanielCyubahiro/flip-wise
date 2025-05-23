import styled from 'styled-components'
import Login from '@/components/Login'
import { StyledButton } from '@/components/StyledButton'
import Link from 'next/link'

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`
const HomePage = () => {
  return (
    <StyledContainer>
      <Link href={'/collections'}>
        <StyledButton>Start Game</StyledButton>
      </Link>
      <Login />
    </StyledContainer>
  )
}

export default HomePage
