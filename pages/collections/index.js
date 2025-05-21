import { StyledH1 } from '@/components/StyledH1'
import { StyledWrapper } from '@/components/StyledWrapper'
import { StyledCardWrapper } from '@/components/LevelCardWrapper'
import { LevelCard } from '@/components/LevelCard'
import Link from 'next/link'
import useSWR from 'swr'

export default function CollectionPage({ fetcher }) {
  const { data: collections, isLoading, error } = useSWR('/api/collections', fetcher)

  if (isLoading) return <div>Loading collections...</div>
  if (error) return <div>Failed to load collections. Error: {error.message}</div>

  const getImagePath = (index) => `/levels/level${index + 1}.png`

  return (
    <StyledWrapper>
      <StyledH1>HarryPotter</StyledH1>
      <StyledH1 $variant="small">Flipwise</StyledH1>

      <StyledCardWrapper>
        {collections.map((collection, index) => (
          <Link key={collection._id} href={`/collections/${collection._id}`} passHref>
            <LevelCard $background={getImagePath(index)}></LevelCard>
          </Link>
        ))}
      </StyledCardWrapper>
    </StyledWrapper>
  )
}
