// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import WingTipStudioLight from '../assets/images/WingTipStudioLight.png';  // Import the image

const HeaderContainer = styled.header`
  width: 100%;
  height: 30vh;  /* Make the header's height dynamic (30% of the viewport height) */
  text-align: center;
  background-image: url(${WingTipStudioLight});
  background-size: contain;
  background-position: center;  /* Keep it centered */
  background-repeat: no-repeat;  /* Ensure no repeat of the image */
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Title = styled(motion.h1)`
  font-size: 3em;
  font-weight: 600;
  margin: 0;
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);  /* Text shadow to improve readability */
  position: relative;
  top: 50%;  /* Center vertically */
  transform: translateY(-50%);  /* Adjust position to vertically align the text */
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
      </Title>
    </HeaderContainer>
  );
};

export default Header;
