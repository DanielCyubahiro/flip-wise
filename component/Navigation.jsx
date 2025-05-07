import { StyledLink } from './StyledLink'
import { StyledFooter } from './StyledFooter'
import { useRouter } from 'next/router'

export default function Navigation() {
  const router = useRouter()
  const isActive = (path) => router.pathname === path

  return (
    <StyledFooter>
      <StyledLink href={`/cards`} $active={isActive('/cards')}>
        All Cards
      </StyledLink>
      <StyledLink href={`/collections`} $active={isActive('/collections')}>
        Collections
      </StyledLink>
    </StyledFooter>
  )
}
