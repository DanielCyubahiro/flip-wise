import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @font-face {
  font-family: 'HARRY';
  src: url('/font/HARRY.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
}

  body {
    margin: 0;
    font-family: system-ui;
    margin-bottom: 100px;
  }

  body.collections-background {
    background-image: url('backgroundPhotos/gameBackground.jpg'); 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
  }
`
