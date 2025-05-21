import {signIn, useSession} from 'next-auth/react';
import {StyledButton} from '@/components/StyledButton';
import Logout from '@/components/Logout';
import {useRouter} from 'next/router';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return <Logout/>
  }

  const callbackUrl = router.query.callbackUrl || router.asPath || '/';
  return <StyledButton onClick={() => signIn("github", { callbackUrl })}>Sign in</StyledButton>
}