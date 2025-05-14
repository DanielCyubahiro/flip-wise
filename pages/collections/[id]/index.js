import { useRouter } from 'next/router'
import useSWR from 'swr'
import { StyledH1 } from '@/component/StyledHeadings'
import { StyledWrapper } from '@/component/StyledWrapper'
import StyledAlert from '@/component/StyledAlert'
import { useAlert } from '@/hooks/useAlert'
import CardList from '@/component/CardList'
import {DeleteCard} from '@/utils/DeleteCard';

export default function CollectionDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const { data: cards, isLoading, error, mutate } = useSWR(id ? `/api/collections/${id}` : null)
  const { alert, triggerAlert, closeAlert } = useAlert()

  const handleDelete = DeleteCard(mutate, triggerAlert)

  return (
    <StyledWrapper>
      {alert.show && (
        <StyledAlert
          message={alert.message}
          type={alert.type}
          onClose={closeAlert}
          duration={3000}
        />
      )}
      <StyledH1>{cards[0]?.collectionId.title}</StyledH1>
      <CardList cards={cards} onDelete={handleDelete} showCollectionName={false} />
    </StyledWrapper>
  )
}
