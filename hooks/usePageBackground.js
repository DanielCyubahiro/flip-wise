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
      } else if (url.startsWith('/collections/')) {
        document.body.classList.add('collection-detail-background')
      } else if (url === '/cards') {
        document.body.classList.add('collection-detail-background')
      }
    }

    handleRouteChange(router.pathname)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])
}
