import { StyledH1 } from '@/components/StyledH1'
import { StyledWrapper } from '@/components/StyledWrapper'
import { StyledCardWrapper } from '@/components/LevelCardWrapper'
import { LevelCard, LevelText } from '@/components/LevelCard'
import Link from 'next/link'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { StyledSmallText } from '@/components/StyledSmallText'
import { StyledH2 } from '@/components/StyledH2'
import { StatusMessage } from '@/components/StatusMessage'
import { StyledButton } from '@/components/StyledButton'
import { useRouter } from 'next/router'
import {useSession} from 'next-auth/react';

export default function CollectionPage() {
  const { data: collections, isLoading, error } = useSWR('/api/collections')
  const [completedCollections, setCompletedCollections] = useState([])
  const router = useRouter()
  const { status } = useSession()
  const handleBackHome = () => {
    router.push('/')
  }
  useEffect(() => {
    const storedCompleted = localStorage.getItem('completedCollections')
    if (storedCompleted) {
      setCompletedCollections(JSON.parse(storedCompleted))
    }
  }, [])

  if (isLoading) return <StatusMessage>Loading collections...</StatusMessage>
  if (error)
    return <StatusMessage>Failed to load collections. Error: {error.message}</StatusMessage>

  const sortedCollections = collections.sort((a, b) => a.order - b.order)
  const getImagePath = (index) => `/levels/level${index + 1}.png`

  return (
    <StyledWrapper>
      <StyledH1>HarryPotter</StyledH1>
      <StyledH2 $variant="small">Flipwise</StyledH2>
      <StyledButton $variant="back" onClick={handleBackHome}>
        ◀︎
      </StyledButton>

      <StyledCardWrapper>
        {sortedCollections.map((collection, index) => {
          const isEnabled =
            index === 0 || completedCollections.includes(sortedCollections[index - 1]._id) || status === 'authenticated'
          const isCompleted = completedCollections.includes(collection._id)

          return (
            <div key={collection._id}>
              <Link href={isEnabled ? `/collections/${collection._id}` : ''} passHref>
                <LevelCard $background={getImagePath(index)} $disabled={!isEnabled}>
                  <LevelText>
                    {collection.title}
                    {!isEnabled && ' (Locked)'}
                    {isCompleted && ' ✓'}
                  </LevelText>
                </LevelCard>
              </Link>
              {!isEnabled && <StyledSmallText>Complete Level {index} to unlock</StyledSmallText>}
            </div>
          )
        })}
      </StyledCardWrapper>
    </StyledWrapper>
  )
}
