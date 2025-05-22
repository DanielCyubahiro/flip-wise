import { StyledH1 } from '@/components/StyledH1'
import { StyledWrapper } from '@/components/StyledWrapper'
import { StyledCardWrapper } from '@/components/LevelCardWrapper'
import { LevelCard, LevelText } from '@/components/LevelCard'
import Link from 'next/link'
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
const getImagePath = (index) => `/levels/level${index + 1}.png`

return (
  <StyledWrapper>
    <StyledH1>Collection List</StyledH1>
    <StyledH1 $variant="small">Flipwise</StyledH1>
    <StyledCardWrapper>
      {sortedCollections.map((collection, index) => {
        const isEnabled =
          index === 0 || completedCollections.includes(sortedCollections[index - 1]._id)
        const isCompleted = completedCollections.includes(collection._id)

        return (
          <div key={collection._id}>
            <Link
              href={isEnabled ? `/collections/${collection._id}` : '#'}
              passHref
            >
              <LevelCard $background={getImagePath(index)} $disabled={!isEnabled}>
                <LevelText>
                  {`Level ${index + 1}: ${collection.title}`}
                  {!isEnabled && ' (Locked)'}
                  {isCompleted && ' ✓'}
                </LevelText>
              </LevelCard>
            </Link>
            {!isEnabled && (
              <StyledSmallText>
                Complete Level {index} to unlock
              </StyledSmallText>
            )}
          </div>
        )
      })}
    </StyledCardWrapper>
  </StyledWrapper>
)
}
