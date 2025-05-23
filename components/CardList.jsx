import Card from './Card'
import { StyledButton } from '@/components/StyledButton'
import useLocalStorageState from 'use-local-storage-state'

export default function CardList({ cards, onDelete, onEdit, fromAllCardsPage = false }) {
  const [correctCardsList, setCorrectCardsList] = useLocalStorageState('correctCardsList', {
    defaultValue: [],
  })
  const handleToggleCorrect = async (cardId) => {
    if (!correctCardsList.some((card) => card.cardId === cardId)) {
      const collectionId = cards.find((card) => card._id === cardId)?.collectionId?._id
      setCorrectCardsList([...correctCardsList, { cardId, collectionId }])
    }
  }

  const handleReset = () => {
    if (!fromAllCardsPage) {
      // Reset for only one collection
      const collectionId = cards && cards[0].collectionId._id
      setCorrectCardsList(correctCardsList.filter((card) => card.collectionId !== collectionId))
    } else {
      // Reset all cards in the game
      setCorrectCardsList([])
    }
  }

  const sortedCards = [...(cards || [])].sort((a, b) => b._id.localeCompare(a._id))

  return (
    <>
      {!fromAllCardsPage && <StyledButton onClick={handleReset}>Reset</StyledButton>}
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
