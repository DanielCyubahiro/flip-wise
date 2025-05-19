import {signIn } from "next-auth/react"
import {StyledButton} from '@/components/StyledButton';

export default function Login() {
  return <StyledButton onClick={() => signIn("github", { callbackUrl: "/cards" })}>Sign in</StyledButton>
}