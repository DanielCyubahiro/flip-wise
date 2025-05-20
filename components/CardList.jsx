import Card from './Card'

export default function CardList({ cards, onDelete, onEdit, showCollectionName = false }) {
  return cards.map((card) => (
    <Card
      key={card._id}
      id={card._id}
      question={card.question}
      answer={card.answer}
      collectionName={card.collectionId?.title}
      showCollectionName={showCollectionName}
      onEdit={() => onEdit(card)}
      onDelete={() => onDelete(card._id)}
      showMarkAsCorrectButton={!!card.collectionId}
      collectionId={card.collectionId?._id}
    />
  ))
}
