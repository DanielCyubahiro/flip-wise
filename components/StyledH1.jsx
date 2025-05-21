import styled, { css } from 'styled-components'

export const StyledH1 = styled.h1`
  text-align: center;
  color: yellow;
  font-family: HARRY;
  font-size: 4rem;
  margin-top: 20px;
  margin-bottom: 0px;

  ${(props) =>
    props.$variant === 'small' &&
    css`
      font-size: 1.5rem;
      color: yellow;
      margin: 0;
    `}
`
