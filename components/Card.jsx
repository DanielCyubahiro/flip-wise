import styled from 'styled-components'
import { StyledButton } from './StyledButton'
import { useState } from 'react'
import { mutate } from 'swr'
import { useRouter } from 'next/router'

const CardContainer = styled.section`
  perspective: 1000px;
`
const CardBox = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 400px;
  padding: 32px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${(props) => props.$isFlipped && `rotateY(180deg)`};
`

const QuestionText = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`

const CardActions = styled.section`
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
`

const ConfirmationText = styled.p`
  all: unset;
  display: flex;
  align-items: center;
`

const FlipButton = styled(StyledButton)`
  background-color: dimgrey;
  color: white;
  border: none;
  width: 40%;
  padding: 0.8rem;
  border-radius: 0.5rem;
`

const CardFrontBack = styled.section`
  backface-visibility: hidden;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
`

const CardFront = styled(CardFrontBack)`
  background-color: #ffffff;
`

const CardBack = styled(CardFrontBack)`
  transform: rotateY(180deg);
  background-color: #dcdcdc;
`

export default function Card({
  question,
  answer,
  collectionName,
  onDelete,
  showCollectionName,
  showMarkAsCorrectButton,
  id,
  isCorrect,
  collectionId,
}) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleDelete = () => {
    if (deleteConfirmation) {
      setDeleteConfirmation(false)
      onDelete()
    } else {
      setDeleteConfirmation(true)
    }
  }

  const handleToggleCorrect = async () => {
    await fetch('/api/correctCards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardId: id }),
    })

    mutate(`/api/cards/${collectionId}`)
  }

  return (
    <CardContainer>
      <CardBox $isFlipped={isFlipped}>
        {!isFlipped && (
          <CardFront>
            {showCollectionName && <p>#{collectionName}</p>}
            <QuestionText>{question}</QuestionText>
            <FlipButton onClick={() => setIsFlipped(!isFlipped)}>Flip</FlipButton>
            <CardActions>
              {deleteConfirmation && (
                <>
                  <ConfirmationText>Are you sure?</ConfirmationText>
                  <StyledButton onClick={() => setDeleteConfirmation(false)}>Cancel</StyledButton>
                </>
              )}
              <StyledButton onClick={handleDelete}>Delete</StyledButton>
            </CardActions>
          </CardFront>
        )}
        {isFlipped && (
          <CardBack>
            {showCollectionName && <p>#{collectionName}</p>}
            <QuestionText>{answer}</QuestionText>
            <FlipButton onClick={() => setIsFlipped(!isFlipped)}>Flip Back</FlipButton>
            {showMarkAsCorrectButton && (
              <StyledButton onClick={handleToggleCorrect}>
                {isCorrect ? 'Mark as not answered yet' : 'Mark as correct'}
              </StyledButton>
            )}
            <CardActions>
              {deleteConfirmation && (
                <>
                  <ConfirmationText>Are you sure?</ConfirmationText>
                  <StyledButton onClick={() => setDeleteConfirmation(false)}>Cancel</StyledButton>
                </>
              )}
              <StyledButton onClick={handleDelete}>Delete</StyledButton>
            </CardActions>
          </CardBack>
        )}
      </CardBox>
    </CardContainer>
  )
}
