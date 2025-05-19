import {SWRConfig} from 'swr';
import GlobalStyle from '../styles';
import Navigation from '@/components/Navigation';
import {SessionProvider} from 'next-auth/react';

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({Component, pageProps: { session, ...pageProps }}) {

  return (
      <SessionProvider session={session}>
        <GlobalStyle/>
        <SWRConfig value={{fetcher}}>
          <Component {...pageProps} />
        </SWRConfig>
        <Navigation/>
      </SessionProvider>
  );
}
