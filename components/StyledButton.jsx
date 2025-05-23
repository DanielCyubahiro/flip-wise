import styled, { css } from 'styled-components'

const ButtonStyle = {
  edit: css`
    background-color: var(--color-button-one);
    border-radius: 6px;
    color: var(--color-secondary);
    font-size: 0.7rem;
    border-width: 3px;
    height: 30px;
  `,
  more: css`
    background-color: var(--color-button-one);
    border-radius: 6px;
    position: absolute;
    right: 35px;
    top: 35px;
    color: var(--color-secondary);
    font-size: 1rem;
    border-width: 3px;
    height: 30px;
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
  sideMenu: css`
    background-color: var(--color-button-one);
    border-width: 6px;
    border-color: var(--color-button-one);
    border-radius: 15px;
    color: #fff;
    cursor: pointer;
    font-size: 0.5rem;
    font-weight: normal;
    outline: 0;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    position: absolute;
    top: 20px;
    right: 45px;
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
  back: css`
    background-color: var(--color-button-one);
    border-width: 6px;
    border-color: var(--color-button-one);
    border-radius: 15px;
    color: #fff;
    cursor: pointer;
    font-size: 0.5rem;
    font-weight: normal;
    outline: 0;
    padding: 7.5px 15px;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    position: absolute;
    top: 20px;
    left: 45px;
    font-size: 1.3rem;
  `,
    mark: css`
    background-color: var(--color-button-one);
    border-width: 6px;
    border-color: var(--color-button-one);
    border-radius: 15px;
    color: #fff;
    cursor: pointer;
    font-size: 0.5rem;
    font-weight: normal;
    outline: 0;
    padding: 7.5px 15px;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  `,
}

export const StyledButton = styled.button`
  padding: 0.3rem 0.5rem;

  &:hover {
    cursor: pointer;
  }

  ${({ $variant }) => $variant && ButtonStyle[$variant]}
`
