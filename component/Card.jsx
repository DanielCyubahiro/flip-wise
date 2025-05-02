import styled from 'styled-components';
import {StyledButton} from '@/component/Button';
import {useState} from 'react';

const CardBox = styled.section`
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    width: 400px;
    padding: 32px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
`;

const QuestionText = styled.h2`
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
`;

const CardActions = styled.div`
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
`;

const ConfirmationText = styled.div`
    display: flex;
    align-items: center;
`;

export default function Card({question, collectionName, onDelete}) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleDelete = () => {
    if (deleteConfirmation) {
      setDeleteConfirmation(false);
      onDelete();
    } else {
      setDeleteConfirmation(true);
    }
  };
  return (
      <CardBox>
        <p>#{collectionName}</p>
        <QuestionText>{question}</QuestionText>
        <CardActions>
          {deleteConfirmation && (
              <>
                <ConfirmationText>Are you sure?</ConfirmationText>
                <StyledButton onClick={() => setDeleteConfirmation(
                    false)}>Cancel</StyledButton>
              </>
          )}
          <StyledButton onClick={handleDelete}>Delete</StyledButton>
        </CardActions>
      </CardBox>
  );
}
