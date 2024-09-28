// src/components/YearNavigation.js

import React, { useRef } from 'react';
import styled from 'styled-components';

const YearNavigationContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  margin-bottom: 20px;
  overflow-x: auto;
  scroll-behavior: smooth; /* Enable smooth scrolling */
  white-space: nowrap;
  padding: 10px 0;

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for aesthetics */
  }
`;

const YearButton = styled.button`
  background-color: ${(props) => (props.$active ? '#f39c12' : 'transparent')};
  color: ${(props) => (props.$active ? '#fff' : '#f39c12')};
  border: none;
  margin: 5px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9em;
  outline: none;
  flex: 0 0 auto;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #f39c12;
    color: #fff;
  }

  &:focus {
    outline: 2px solid #f39c12;
  }
`;

const YearNavigation = ({ years, activeYear, onYearClick }) => {
  const containerRef = useRef();

  const handleMouseEnter = (e, year) => {
    const container = containerRef.current;
    const button = e.currentTarget;
    const containerWidth = container.clientWidth;
    const buttonLeft = button.offsetLeft;
    const buttonWidth = button.clientWidth;

    const centerPoint = containerWidth / 2;
    const buttonCenter = buttonLeft + buttonWidth / 2;

    // If the button is on the right side of the center, scroll right
    if (buttonCenter > centerPoint) {
      container.scrollBy({
        left: (buttonCenter - centerPoint) / 2,
        behavior: 'smooth',
      });
    }

    // If the button is on the left side of the center, scroll left
    if (buttonCenter < centerPoint) {
      container.scrollBy({
        left: -(centerPoint - buttonCenter) / 2,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseLeave = () => {
    // Optional: stop scrolling when the mouse leaves the button
    // You can add any cleanup or stop-scrolling logic here if needed
  };

  return (
    <YearNavigationContainer ref={containerRef}>
      {years.map((year) => (
        <YearButton
          key={year}
          data-year={year}
          $active={activeYear === year}
          onClick={() => onYearClick(year)}
          onMouseEnter={(e) => handleMouseEnter(e, year)} /* Trigger scroll on hover */
          onMouseLeave={handleMouseLeave} /* Optional: Add cleanup on mouse leave */
        >
          {year}
        </YearButton>
      ))}
    </YearNavigationContainer>
  );
};

export default YearNavigation;
