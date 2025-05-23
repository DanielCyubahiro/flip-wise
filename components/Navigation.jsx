import { StyledLink } from './StyledLink'
import { StyledFooter } from './StyledFooter'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Logout from '@/components/Logout'
import Music from './Music'

export default function Navigation() {
  const router = useRouter()
  const isActive = (path) => router.pathname.startsWith(path)
  const { status } = useSession()

  return (
    <StyledFooter>
      {status === 'authenticated' && (
        <StyledLink href={`/cards`} $active={isActive('/cards')}>
          Cards
        </StyledLink>
      )}
      <StyledLink href={`/collections`} $active={isActive('/collections')}>
        Levels
      </StyledLink>
      {status === 'authenticated' && <Logout />}
      <Music></Music>
    </StyledFooter>
  )
}
