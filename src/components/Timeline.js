import React, { useRef, useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import YearNavigation from './YearNavigation';
import TrackItemComponent from './TrackItemComponent';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TimelineContainer = styled.div`
  position: relative;
  padding: 20px;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.$left ? 'left: -10px;' : 'right: -10px;')}
  transform: translateY(-50%);
  background-color: #f39c12;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  color: #fff;
  font-size: 1.5em;
  display: none;

  ${TimelineContainer}:hover & {
    display: block;
  }

  &:focus {
    outline: none;
  }
`;

const TrackList = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-padding-left: calc((100% - 250px) / 2);
  scroll-padding-right: calc((100% - 250px) / 2);

  &::-webkit-scrollbar {
    display: none;
  }
`;

// Use forwardRef to allow the parent to call scrollToIndex
const Timeline = forwardRef(({ musicData, onSelectTrack }, ref) => {
  const scrollRef = useRef();
  const itemRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extract years for navigation
  const years = musicData.map((yearData) => yearData.year);
  const [activeYear, setActiveYear] = useState(years[0]);

  const { items, yearToIndex } = useMemo(() => {
    const items = [];
    const yearToIndex = {};
    let overallIndex = 0;

    musicData.forEach((yearData) => {
      yearData.tracks.forEach((track) => {
        if (!(yearData.year in yearToIndex)) {
          yearToIndex[yearData.year] = overallIndex; // Map year to first track index
        }
        items.push({ track, year: yearData.year });
        overallIndex++;
      });
    });

    return { items, yearToIndex };
  }, [musicData]);

  const calculateOpacity = (index) => {
    const distance = Math.abs(index - currentIndex);
    return Math.max(1 - distance * 0.3, 0.3); // Adjust opacity based on distance from currentIndex
  };

  // Allow parent to call scrollToIndex
  useImperativeHandle(ref, () => ({
    scrollToIndex: (index) => {
      if (index >= 0 && index < itemRefs.current.length) {
        const element = itemRefs.current[index];
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
          });
          setCurrentIndex(index);

          // Update active year based on the track
          const item = items[index];
          setActiveYear(item.year);
          onSelectTrack(item.track, index); // Pass track and index to MusicPlayer
        }
      }
    }
  }));

  const scrollLeft = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      ref.current.scrollToIndex(newIndex);  // Use ref to call scrollToIndex
    }
  };

  const scrollRight = () => {
    if (currentIndex < items.length - 1) {
      const newIndex = currentIndex + 1;
      ref.current.scrollToIndex(newIndex);  // Use ref to call scrollToIndex
    }
  };

  const scrollToYear = (year) => {
    const index = yearToIndex[year]; // Get the index of the first track for the selected year
    if (index !== undefined) {
      ref.current.scrollToIndex(index);  // Use ref to call scrollToIndex
    }
  };

  return (
    <TimelineContainer>
      <YearNavigation
        years={years}
        activeYear={activeYear}
        onYearClick={scrollToYear} // Handle year button click to scroll to the first track of the year
      />

      <NavButton $left onClick={scrollLeft}>
        <FaChevronLeft />
      </NavButton>
      <NavButton onClick={scrollRight}>
        <FaChevronRight />
      </NavButton>

      <TrackList ref={scrollRef}>
        {items.map((item, index) => (
          <TrackItemComponent
            key={`${item.year}-${index}`}
            ref={(el) => (itemRefs.current[index] = el)}
            track={item.track}
            onSelectTrack={() => onSelectTrack(item.track, index)}  // Pass the single track
            opacity={calculateOpacity(index)}
            tabIndex={0}
            year={item.year}
          />
        ))}
      </TrackList>
    </TimelineContainer>
  );
});

export default Timeline;
