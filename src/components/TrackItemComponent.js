// src/components/TrackItemComponent.js

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMusic } from 'react-icons/fa';

const TrackItemContainer = styled.div`
  min-width: 250px;
  flex: 0 0 auto;
  margin-right: 20px;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TrackItem = styled(motion.div)`
  position: relative;
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.disabled ? '#555' : '#fff')};
  outline: none;
  width: 100%;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#1e1e1e' : '#333')};
  }

  &:focus {
    border: 2px solid #f39c12;
  }
`;

const YearLabel = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8em;
  color: #f39c12;
`;

const IconWrapper = styled.div`
  font-size: 3em;
  margin-bottom: 10px;
`;

const TrackTitle = styled.h3`
  margin: 10px 0 5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: center;
  max-width: 100%;
`;

const TrackDescription = styled.p`
  font-size: 0.9em;
  color: #ccc;
  max-width: 280px;
  margin: 10px auto 0;
  text-align: center;
  word-wrap: break-word;
`;

const TrackItemComponent = React.forwardRef(
  ({ track, onSelectTrack, opacity, tabIndex, year }, ref) => {
    return (
      <TrackItemContainer ref={ref} style={{ opacity }}>
        <TrackItem
          tabIndex={tabIndex}
          whileHover={{ scale: track.src ? 1.05 : 1 }}
          whileTap={{ scale: track.src ? 0.95 : 1 }}
          onClick={() => track.src && onSelectTrack(track)}
          disabled={!track.src}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <YearLabel>{year}</YearLabel>
          <IconWrapper>
            <FaMusic color={track.src ? '#f39c12' : '#555'} />
          </IconWrapper>
          <TrackTitle>{track.title}</TrackTitle>
        </TrackItem>
        {track.description ? (
          <TrackDescription>{track.description}</TrackDescription>
        ) : (
          <TrackDescription>&nbsp;</TrackDescription>
        )}
      </TrackItemContainer>
    );
  }
);

export default TrackItemComponent;
