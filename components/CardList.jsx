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
      const collectionId = cards && cards[0].collectionId._id
      setCorrectCardsList(correctCardsList.filter((card) => card.collectionId !== collectionId))
    } else {
      setCorrectCardsList([])
    }
  }

  return (
    <>
      {/*!fromAllCardsPage && (
        <StyledButton $variant="reset" onClick={handleReset}>
          Reset
        </StyledButton>
      )*/}
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
