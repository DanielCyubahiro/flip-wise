import { SWRConfig } from 'swr'
import GlobalStyle from '../styles'
import usePageBackground from '@/hooks/usePageBackground'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function App({ Component, pageProps }) {
  usePageBackground()

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  )
}
