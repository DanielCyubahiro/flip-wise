import styled from 'styled-components'

export const LevelCard = styled.a`
  display: inline-block;
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
