import Card from './Card'
import { StyledButton } from '@/components/StyledButton'
import useLocalStorageState from 'use-local-storage-state'

export default function CardList({
  cards,
  onDelete,
  fromAllCardsPage = false,
  onEdit,
  completedCollections,
  setCompletedCollections,
}) {
  const [correctCardsList, setCorrectCardsList] = useLocalStorageState('correctCardsList', {
    defaultValue: [],
  })
  const collectionId = cards && cards[0].collectionId._id

  const handleToggleCorrect = async (cardId) => {
    if (!correctCardsList.some((card) => card.cardId === cardId)) {
      setCorrectCardsList([...correctCardsList, { cardId, collectionId }])
    }
  }

  const normalizedCompletedCollections = Array.isArray(completedCollections)
    ? completedCollections
    : []

  const handleReset = () => {
    if (!fromAllCardsPage) {
      let index = correctCardsList.findIndex((card) => card.collectionId === collectionId)
      setCorrectCardsList(index !== -1 ? correctCardsList.slice(0, index) : correctCardsList)

      index = completedCollections.indexOf(collectionId)
      setCompletedCollections(index !== -1 ? completedCollections.slice(0, index) : completedCollections)
} else {
      setCorrectCardsList([])
      setCompletedCollections([])
    }
  }

  if (
    cards?.length ===
      correctCardsList.filter((card) => card.collectionId === collectionId)?.length &&
    !normalizedCompletedCollections.includes(collectionId)
  ) {
    setCompletedCollections([...normalizedCompletedCollections, collectionId])
  }

  const sortedCards = [...(cards || [])].sort((a, b) => b._id.localeCompare(a._id))

  return (
    <>
      {!fromAllCardsPage && (
        <StyledButton $variant="reset" onClick={handleReset}>
          Reset
        </StyledButton>
      )}
      {correctCardsList &&
        sortedCards.map((card) => (
          <Card
            key={card._id}
            id={card._id}
            question={card.question}
            answer={card.answer}
            collectionName={card.collectionId?.title}
            fromAllCardsPage={fromAllCardsPage}
            onDelete={() => onDelete(card._id)}
            onEdit={() => onEdit(card)}
            isCorrect={correctCardsList.some((c) => c.cardId === card._id)}
            handleToggleCorrect={handleToggleCorrect}
          />
        ))}
    </>
  )
}
