import styled, { css } from 'styled-components'

export const StyledH1 = styled.h1`
  text-align: center;
  color: var(--color-secondary);
  font-family: HARRY;
  font-size: 4rem;
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
  ${(props) =>
    props.$variant === 'extra' &&
    css`
      font-size: 6rem;
      position: absolute;
      top: 100px;
    `}
`
