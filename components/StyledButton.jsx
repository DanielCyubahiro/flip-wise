import styled, { css } from 'styled-components'

const ButtonStyle = {
  more: css`
    position: absolute;
    right: 35px;
    top: 35px;
  `,
  startGame: css`
    background-color: var(--color-button-one);
    border-width: 6px;
    border-color: var(--color-tertiary);
    border-radius: 56px;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    font-weight: normal;
    outline: 0;
    padding: 20px 50px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:hover {
      transform: scale(1.3);
    }
  `,
  login: css`
    background-color: var(--color-button-two);
    border-width: 6px;
    border-color: var(--color-tertiary);
    border-radius: 56px;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    font-weight: normal;
    outline: 0;
    padding: 10px 25px;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    position: absolute;
    bottom: 250px;

    &:hover {
      transform: scale(1.1);
    }
  `,
  reset: css`
    background-color: var(--color-button-two);
    border-width: 6px;
    border-color: var(--color-tertiary);
    border-radius: 56px;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    font-weight: normal;
    outline: 0;
    padding: 10px 25px;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:hover {
      transform: scale(1.1);
    }
  `,
}

export const StyledButton = styled.button`
  padding: 0.3rem 0.5rem;

  &:hover {
    cursor: pointer;
  }

  ${({ $variant }) => $variant && ButtonStyle[$variant]}
`
