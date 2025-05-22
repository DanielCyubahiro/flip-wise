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
  --color-senary: #414557;
}

  body {
    margin: 0;
    font-family: system-ui;
    margin-bottom: 100px;
  }
`
