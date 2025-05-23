import { StyledH1 } from '@/components/StyledH1'
import { StyledWrapper } from '@/components/StyledWrapper'
import { StyledCardWrapper } from '@/components/LevelCardWrapper'
import { LevelCard, LevelText } from '@/components/LevelCard'
import Link from 'next/link'
import useSWR from 'swr'
import { StyledH2 } from '@/components/StyledH2'
import { StatusMessage } from '@/components/StatusMessage'

export default function CollectionPage({ fetcher }) {
  const { data: collections, isLoading, error } = useSWR('/api/collections', fetcher)

  if (isLoading) return <StatusMessage>Loading collections...</StatusMessage>
  if (error)
    return <StatusMessage>Failed to load collections. Error: {error.message}</StatusMessage>

  const getImagePath = (index) => `/levels/level${index + 1}.png`

  return (
    <StyledWrapper>
      <StyledH1>HarryPotter</StyledH1>
      <StyledH2 $variant="small">Flipwise</StyledH2>

      <StyledCardWrapper>
        {collections.map((collection, index) => (
          <Link key={collection._id} href={`/collections/${collection._id}`} passHref>
            <LevelCard $background={getImagePath(index)}>
              <LevelText>{collection.title}</LevelText>
            </LevelCard>
          </Link>
        ))}
      </StyledCardWrapper>
    </StyledWrapper>
  )
}
