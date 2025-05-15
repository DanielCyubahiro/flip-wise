import styled, { css } from 'styled-components'

const ButtonStyle = {
  more: css`
    position: absolute;
    right: 35px;
    top: 35px;
  `,
}

export const StyledButton = styled.button`
  padding: 0.3rem 0.5rem;

  &:hover {
    cursor: pointer;
  }

  ${({ $variant }) => $variant && ButtonStyle[$variant]}
`
