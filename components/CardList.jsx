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
      // Reset for only one collection
      const collectionId = cards && cards[0].collectionId._id

      let index = correctCardsList.findIndex((card) => card.collectionId === collectionId)
      setCorrectCardsList(index !== -1 ? correctCardsList.slice(0, index) : correctCardsList)

      index = completedCollections.indexOf(collectionId)
      setCompletedCollections(index !== -1 ? completedCollections.slice(0, index+1) : completedCollections)
      console.log('correctCardsList',correctCardsList)
      console.log('completedCollections',completedCollections)
    } else {
      // Reset all cards in the game
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

  return (
    <>
      {!fromAllCardsPage && <StyledButton onClick={handleReset}>Reset</StyledButton>}
      {correctCardsList &&
        cards.map((card) => (
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
