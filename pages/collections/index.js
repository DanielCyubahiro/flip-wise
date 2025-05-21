import { StyledH1 } from '@/components/StyledH1'
import { StyledLink } from '@/components/StyledLink'
import { StyledWrapper } from '@/components/StyledWrapper'
import useSWR from 'swr'

export default function CollectionPage({ fetcher }) {
  const { data: collections, isLoading, error } = useSWR('/api/collections', fetcher)

  if (isLoading) return <div>Loading collections...</div>
  if (error) return <div>Failed to load collections. Error: {error.message}</div>

  return (
    <StyledWrapper>
      <StyledH1>Collection List</StyledH1>
      {collections.map((collection) => {
        return (
          <StyledLink
            key={collection._id}
            href={`/collections/${collection._id}`}
            variant="lightBlue"
          >
            {`Collection: ${collection.title}`}
          </StyledLink>
        )
      })}
    </StyledWrapper>
  )
}
