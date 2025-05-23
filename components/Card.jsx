import styled from 'styled-components'
import { StyledButton } from './StyledButton'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const CardContainer = styled.section`
  perspective: 1000px;
`
const CardBox = styled.section`
  background-color: ${(props) =>
    props.$isCorrect ? 'var(--color-secondary)' : 'var(--color-primary)'};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 32px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${(props) => props.$isFlipped && `rotateY(180deg)`};
`

const QuestionText = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-secondary);
`

const AnswerText = styled.h2`
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
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
  color: var(--color-tertiary);
`

const FlipButton = styled(StyledButton)`
  background-color: var(--color-button-two);
  border-width: 6px;
  border-color: var(--color-tertiary);
  border-radius: 56px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: normal;
  outline: 0;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    transform: scale(1.1);
  }
`

const CardFrontBack = styled.section`
  backface-visibility: hidden;
  border-radius: 10px;
  width: 350px;
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
  background-color: var(--color-quinary);
`

const CardBack = styled(CardFrontBack)`
  transform: rotateY(180deg);
  background-color: #dcdcdc;
  height: 190px;
`
const Logo = styled.span`
  font-family: HARRY;
  position: absolute;
  font-size: 2.5rem;
  left: 45px;
  bottom: 40px;
  color: var(--color-secondary);
`

export default function Card({
  question,
  answer,
  collectionName,
  onDelete,
  onEdit,
  showCollectionName,
  id,
  isCorrect,
  handleToggleCorrect,
}) {
  const { status } = useSession()
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [showMoreOption, setShowMoreOption] = useState(false)
  const [isFlipped, setIsFlipped] = useState(isCorrect)

  useEffect(() => {
    setIsFlipped(isCorrect)
  }, [isCorrect])

  const handleDelete = () => {
    if (deleteConfirmation) {
      setDeleteConfirmation(false)
      onDelete()
    } else {
      setDeleteConfirmation(true)
    }
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit()
    }
  }
  return (
    <CardContainer>
      <CardBox $isFlipped={isFlipped} $isCorrect={isCorrect}>
        {!isFlipped && (
          <CardFront>
            {status === 'authenticated' && (
              <StyledButton $variant="more" onClick={() => setShowMoreOption((show) => !show)}>
                ...
              </StyledButton>
            )}
            {showCollectionName && <p>#{collectionName}</p>}
            <QuestionText>{question}</QuestionText>
            <FlipButton onClick={() => setIsFlipped(!isFlipped)}>Flip</FlipButton>
            <CardActions>
              {deleteConfirmation && (
                <>
                  <ConfirmationText>Are you sure?</ConfirmationText>
                  <StyledButton $variant="edit" onClick={() => setDeleteConfirmation(false)}>
                    Cancel
                  </StyledButton>
                </>
              )}
              {showMoreOption && (
                <>
                  <StyledButton $variant="edit" onClick={handleDelete}>
                    Delete
                  </StyledButton>
                  <StyledButton $variant="edit" onClick={handleEdit}>
                    Edit
                  </StyledButton>
                </>
              )}
            </CardActions>
            <Logo>P</Logo>
          </CardFront>
        )}
        {isFlipped && (
          <CardBack>
            {showCollectionName && <p>#{collectionName}</p>}
            <AnswerText>{answer}</AnswerText>
            {!isCorrect && (
              <>
                <FlipButton onClick={() => setIsFlipped(!isFlipped)}>Flip Back</FlipButton>
                {status !== 'authenticated' && (
                  <StyledButton onClick={() => handleToggleCorrect(id)}>I know it!</StyledButton>
                )}
              </>
            )}
          </CardBack>
        )}
      </CardBox>
    </CardContainer>
  )
}
