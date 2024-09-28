// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  padding: 40px 20px;
  text-align: center;
  background: linear-gradient(90deg, #f39c12 0%, #e74c3c 100%);
  color: #fff;
  margin-bottom: 20px; // Add margin to push content down
`;

const Title = styled(motion.h1)`
  font-size: 3em;
  font-weight: 600;
  margin: 0;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        wingtipstudio
      </Title>
    </HeaderContainer>
  );
};

export default Header;
