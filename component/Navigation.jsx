import { StyledLink } from './StyledLink'
import { StyledFooter } from './StyledFooter'

export default function Navigation() {
  return (
    <StyledFooter>
      <StyledLink href={`/`}>All Cards</StyledLink>
      <StyledLink href={`/collections`}>Collections</StyledLink>
    </StyledFooter>
  )
}
