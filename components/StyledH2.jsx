import styled, { css } from 'styled-components'

export const StyledH2 = styled.h2`
  text-align: center;

  color: var(--color-secondary);
  font-family: HARRY;
  font-size: 2rem;
  margin-top: 20px;
  margin-bottom: 0px;

  ${(props) =>
    props.$variant === 'small' &&
    css`
      font-size: 1.5rem;
      margin: 0;
    `}

  ${(props) =>
    props.$variant === 'big' &&
    css`
      font-size: 2rem;
      position: absolute;
      top: 200px;
    `}
`
