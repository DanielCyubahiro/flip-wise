import styled from 'styled-components'

export const LevelCard = styled.button`
  display: inline-block;
  position: relative;
  width: 300px;
  height: 100px;
  background-image: url(${(props) => props.$background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`
export const LevelText = styled.span`
  position: absolute;
  right: 10px;
  color: white;
  bottom: 10px;
  font-family: HARRY;
  font-size: 1rem;
`
