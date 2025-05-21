import Card from './Card'
import { StyledButton } from '@/components/StyledButton'
import useLocalStorageState from 'use-local-storage-state'

export default function CardList({ cards, onDelete, fromAllCardsPage = false, setCompletedCollections }) {
  const [correctCardsList, setCorrectCardsList] = useLocalStorageState('correctCardsList', {
    defaultValue: [],
  })
  const collectionId = cards && cards[0].collectionId._id

  const handleToggleCorrect = async (cardId) => {
    if (!correctCardsList.some((card) => card.cardId === cardId)) {
      setCorrectCardsList([...correctCardsList, { cardId, collectionId }])
    }
  }

  const handleReset = () => {
    if (!fromAllCardsPage) {
      setCorrectCardsList(correctCardsList.filter((card) => card.collectionId !== collectionId))
    } else {
      // Reset all cards in the game
      setCorrectCardsList([])
    }
  }

  if (cards?.length === correctCardsList?.length) {
    setCompletedCollections(prev => ({ ...prev, collectionId }))
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
            isCorrect={correctCardsList.some((c) => c.cardId === card._id)}
            handleToggleCorrect={handleToggleCorrect}
          />
        ))}
    </>
  )
}
