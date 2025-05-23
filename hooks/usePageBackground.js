import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function usePageBackground() {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === '/collections') {
        document.body.classList.add('collections-background')
      } else if (url === '/') {
        document.body.classList.add('home-background')
      }
    }

    handleRouteChange(router.pathname)
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])
}
