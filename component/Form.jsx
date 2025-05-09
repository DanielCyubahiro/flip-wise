import styled from 'styled-components';
import {useState} from 'react';

const FormBox = styled.form`
    background-color: #eeeeee;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    width: 450px;
    padding: 32px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
`;

const FormText = styled.label`
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
`;

const FormInput = styled.input`
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
`;

const FormButton = styled.button`
    font-size: 1rem;
    font-weight: 600;
    color: #333;
`;

export default function Form({card, collectionsList, onSubmit}) {
  const [question, setQuestion] = useState(card?.question || '');
  const [answer, setAnswer] = useState(card?.answer || '');
  const [collectionId, setCollectionId] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      question,
      answer,
      collectionId,
    });

    if (!card) {
      setQuestion("");
      setAnswer("");
      setCollectionId("");
    }
  }

  return (
      <FormBox onSubmit={handleSubmit}>
        <FormText htmlFor="question">Question</FormText>
        <FormInput
            required
            id="question"
            name="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
        />
        <FormText htmlFor="answer">Answer</FormText>
        <FormInput
            required
            id="answer"
            name="answer"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
        />
        <FormText htmlFor="collection">Collection</FormText>
        <select
            required
            id="collection"
            name="collectionId"
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
        >
          <option value="">Select collection</option>
          {collectionsList.map((col) => (
              <option key={col._id} value={col._id}>
                {col.title}
              </option>
          ))}
        </select>
        <FormButton type="submit">Add Card</FormButton>
      </FormBox>
  );
}
