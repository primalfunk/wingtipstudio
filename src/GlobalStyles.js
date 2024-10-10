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

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }

  /* Smaller font sizes for smaller screens */
  p, span, button, a, li {
    font-size: 1rem; /* Set a standard font size */
  }

  /* Mobile-specific media query for 1080x2340 pixels */
  @media (max-width: 1080px) {
    body {
      font-size: 0.9rem; /* Make the base font slightly smaller */
    }

    h1 {
      font-size: 2rem; /* Reduce heading sizes for mobile */
    }

    h2 {
      font-size: 1.5rem; /* Make smaller for mobile fit */
    }

    h3 {
      font-size: 1.25rem;
    }

    h4, h5, h6 {
      font-size: 1rem; /* Keep these smaller for compactness */
    }

    p, span, button, a, li {
      font-size: 0.85rem; /* Shrink all general text and elements */
    }

    .App-container, .Player-container {
      width: 100%; /* Ensure full width use */
      padding: 5px; /* Reduce padding for tight fit */
    }

    .TrackItemComponent {
      min-width: 120px; /* Slimmed for mobile displays */
      margin-right: 5px;
    }

    .MusicPlayer {
      max-width: 90%; /* Ensure it fits well on mobile */
    }

    .App-header {
      padding: 10px; /* Reduce header padding */
    }
  }
`;

export default GlobalStyles;
