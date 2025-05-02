import styled from "styled-components";
import { StyledH2 } from "./StyledHeadings";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const CardBox = styled.div`
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

export default function Card({ question, collectionTitle }) {
  return (
    <CardContainer>
      <CardBox>
        <StyledH2>{collectionTitle}</StyledH2>
        <QuestionText>{question}</QuestionText>
      </CardBox>
    </CardContainer>
  );
}
