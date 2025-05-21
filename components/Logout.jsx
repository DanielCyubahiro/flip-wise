import {signOut, useSession} from 'next-auth/react';
import {StyledButton} from '@/components/StyledButton';
import styled from 'styled-components';

const StyledLogoutButton = styled(StyledButton)`
    background: black;
    color: white;
    border-style: none;
    padding: 0.8rem 1.5rem;
    border-radius: 0.6rem;
    font-weight: bold;
    font-size: 1rem;
`
const Logout = () => {
  const { data: session } = useSession();

  if (session) {
    return <StyledLogoutButton onClick={() => signOut({ callbackUrl: "/cards" })}>Sign out</StyledLogoutButton>
  }
};

export default Logout;
