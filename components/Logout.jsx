import {signOut, useSession} from 'next-auth/react';
import {StyledButton} from '@/components/StyledButton';
import styled from 'styled-components';

const StyledLogoutButton = styled(StyledButton)`
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    display: flex;
    place-items: center;
`
const Logout = () => {
  const { data: session } = useSession();

  if (session) {
    return <StyledLogoutButton onClick={() => signOut()}>Sign out</StyledLogoutButton>
  }
};

export default Logout;
