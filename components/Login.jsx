import { useSession, signIn, signOut } from "next-auth/react"
import {StyledButton} from '@/components/StyledButton';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
        <>
          Signed in as {session.user.email} <br />
          <StyledButton onClick={() => signOut()}>Sign out</StyledButton>
        </>
    )
  }
  return (
      <>
        Not signed in <br />
        <StyledButton onClick={() => signIn("github", { callbackUrl: "/cards" })}>Sign in</StyledButton>
      </>
  )
}