// src/GlobalStyles.js

import { createGlobalStyle, keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(-45deg, #1e1e1e, #333333, #1e1e1e, #000000);
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite;
    color: #FFFFFF;
    overflow-x: hidden;
  }
`;

export default GlobalStyles;
