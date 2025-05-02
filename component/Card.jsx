import styled from "styled-components";

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

const QuestionText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

export default function Card({ question, collectionName }) {
  return (
    <CardBox>
      <span>#{collectionName}</span>
      <QuestionText>{question}</QuestionText>
    </CardBox>
  );
}
