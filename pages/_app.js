import {SWRConfig} from 'swr';
import GlobalStyle from '../styles';
import {SessionProvider} from 'next-auth/react';
import {useRouter} from 'next/router';
import Navigation from '@/components/Navigation';

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({Component, pageProps: { session, ...pageProps }}) {
  const router = useRouter();
  console.log(router)
  return (
      <SessionProvider session={session}>
        <GlobalStyle/>
        <SWRConfig value={{fetcher}}>
          <Component {...pageProps} />
        </SWRConfig>
        {router.pathname !== '/' && <Navigation/>}
      </SessionProvider>
  );
}
