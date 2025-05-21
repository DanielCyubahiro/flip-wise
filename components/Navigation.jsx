import { StyledLink } from './StyledLink'
import { StyledFooter } from './StyledFooter'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Logout from '@/components/Logout'

export default function Navigation() {
  const router = useRouter()
  const isActive = (path) => router.pathname === path
  const { status } = useSession()

  return (
    <StyledFooter>
      {status === 'authenticated' && (
        <StyledLink href={`/cards`} $active={isActive('/cards')}>
          All Cards
        </StyledLink>
      )}
      <StyledLink href={`/collections`} $active={isActive('/collections')}>
        Collections
      </StyledLink>
      {status === 'authenticated' && <Logout />}
    </StyledFooter>
  )
}
