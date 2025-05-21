import {signIn, useSession} from 'next-auth/react';
import {StyledButton} from '@/components/StyledButton';
import Logout from '@/components/Logout';
import {useRouter} from 'next/router';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return <Logout/>
  }
  return <StyledButton onClick={() => signIn("github", { callbackUrl: '/cards' })}>Sign in</StyledButton>
}