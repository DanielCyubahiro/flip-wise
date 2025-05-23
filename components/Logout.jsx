import { signOut, useSession } from 'next-auth/react'
import { StyledButton } from '@/components/StyledButton'
import styled from 'styled-components'

const StyledLogoutButton = styled(StyledButton)`
  display: inline-block;
  padding: 0.85rem 1.4rem;
  border-radius: 0.6rem;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid black;
  transition: background-color 0.2s, border-color 0.2s;
  font-size: 1rem;
  margin: 0 6px;

  color: white;
  background-color: ${({ $active }) =>
    $active ? 'var(--color-button-two)' : 'var(--color-button-one)'};

  &:hover {
    background-color: #4a4949;
    border-color: #1a1a1a;
  }
`

const Logout = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <StyledLogoutButton onClick={() => signOut({ callbackUrl: '/cards' })}>
        Log out
      </StyledLogoutButton>
    )
  }
}

export default Logout
