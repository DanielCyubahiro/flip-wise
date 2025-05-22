import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --color-primary: #000000;           
    --color-secondary: #ffff00;         
    --color-tertiary: #65574c;          
    --color-quaternary: #714E33;        
    --color-quinary: #1C1B26;           
    --color-button-one: rgba(65, 69, 87, 0.7);
    --color-button-two: rgba(113, 78, 51, 0.51);
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
    background-image: url('/backgroundPhotos/gameBackground.jpg'); 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
  }

  body.home-background {
    background-image: url('/backgroundPhotos/homeBackground.jpg'); 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
  }

  body.collection-detail-background {
    background-image: url('/backgroundPhotos/levelBackground.jpg'); 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
  }
`
