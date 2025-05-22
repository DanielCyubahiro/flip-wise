import { signIn, useSession } from 'next-auth/react'
import { StyledButton } from '@/components/StyledButton'
import Logout from '@/components/Logout'
import { useRouter } from 'next/router'
import { StyledWrapper } from './StyledWrapper'
import { StyledH1 } from './StyledH1'

export default function Login() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    return <Logout />
  }

  const callbackUrl = router.query.callbackUrl || '/cards'
  return (
    <StyledWrapper>
      <StyledH1 $variant="extra">HarryPotter</StyledH1>
      <StyledH1 $variant="big">Flipwise</StyledH1>
      <StyledButton $variant="startGame">Start Game</StyledButton>
      <StyledButton $variant="login" onClick={() => signIn('github', { callbackUrl })}>
        Log in
      </StyledButton>
    </StyledWrapper>
  )
}
