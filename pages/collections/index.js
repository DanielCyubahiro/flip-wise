import { StyledH1 } from '@/components/StyledH1'
import { StyledLink } from '@/components/StyledLink'
import { StyledWrapper } from '@/components/StyledWrapper'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { StyledSmallText } from '@/components/StyledSmallText'

export default function CollectionPage() {
  const { data: collections, isLoading, error } = useSWR('/api/collections')
  const [completedCollections, setCompletedCollections] = useState([])

  useEffect(() => {
    const storedCompleted = localStorage.getItem('completedCollections')
    if (storedCompleted) {
      setCompletedCollections(JSON.parse(storedCompleted))
    }
  }, [])

  if (isLoading) return <div>Loading collections...</div>
  if (error) return <div>Failed to load collections. Error: {error.message}</div>

  const sortedCollections = collections.sort((a, b) => a.order - b.order)

  return (
    <StyledWrapper>
      <StyledH1>Collection List</StyledH1>
      {sortedCollections.map((collection, index) => {
        const isEnabled =
          index === 0 || completedCollections.includes(sortedCollections[index - 1]._id)
        return (
          <div key={collection._id}>
            <StyledLink
              href={isEnabled ? `/collections/${collection._id}` : '#'}
              variant={isEnabled ? 'lightBlue' : 'disabled'}
            >
              {`Level ${index + 1}: ${collection.title}`}
              {!isEnabled && ' (Locked)'}
              {completedCollections.includes(collection._id) && ' ✓'}
            </StyledLink>
            {!isEnabled && <StyledSmallText>Complete Level {index} to unlock</StyledSmallText>}
          </div>
        )
      })}
    </StyledWrapper>
  )
}
