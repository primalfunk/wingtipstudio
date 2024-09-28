// src/components/YearNavigation.js

import React from 'react';
import styled from 'styled-components';

const YearNavigationContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap onto multiple lines */
  justify-content: center;
  margin-bottom: 20px;
`;

const YearButton = styled.button`
  background-color: ${(props) => (props.$active ? '#f39c12' : 'transparent')};
  color: ${(props) => (props.$active ? '#fff' : '#f39c12')};
  border: none;
  margin: 5px; /* Adjusted margin for better spacing */
  padding: 8px 12px; /* Adjusted padding */
  cursor: pointer;
  font-size: 0.9em; /* Slightly smaller font size */
  outline: none;
  flex: 1 1 60px; /* Allow buttons to shrink and grow */
  max-width: 100px; /* Optional: Set a maximum width for buttons */

  &:hover {
    background-color: #f39c12;
    color: #fff;
  }

  &:focus {
    outline: 2px solid #f39c12;
  }
`;

const YearNavigation = ({ years, activeYear, onYearClick }) => {
  return (
    <YearNavigationContainer>
      {years.map((year) => (
        <YearButton
          key={year}
          onClick={() => onYearClick(year)}
          $active={activeYear === year}
        >
          {year}
        </YearButton>
      ))}
    </YearNavigationContainer>
  );
};

export default YearNavigation;
