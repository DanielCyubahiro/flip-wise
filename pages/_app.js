import { SWRConfig } from 'swr'
import GlobalStyle from '../styles'
import Navigation from '@/component/Navigation'

const fetcher = (url) => fetch(url).then((response) => response.json())

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
      <Navigation />
    </>
  )
}
