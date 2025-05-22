import { SWRConfig } from 'swr'
import GlobalStyle from '../styles'
import usePageBackground from '@/hooks/usePageBackground'
import { SessionProvider } from 'next-auth/react'
import {useRouter} from 'next/router';
import Navigation from '@/components/Navigation';


const fetcher = (url) => fetch(url).then((res) => res.json())

export default function App({ Component, pageProps: { session, ...pageProps } }) {
usePageBackground()
  const router = useRouter()
  return (
      <SessionProvider session={session}>
        <GlobalStyle/>
        <SWRConfig value={{fetcher}}>
          <Component {...pageProps} />
        </SWRConfig>
        {router.pathname !== '/' && <Navigation />}
      </SessionProvider>
  );
}
