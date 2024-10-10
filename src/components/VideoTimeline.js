// src/components/VideoTimeline.js
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
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

const VideoList = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-padding-left: calc((100% - 250px) / 2);
  scroll-padding-right: calc((100% - 250px) / 2);

  &::-webkit-scrollbar {
    display: none;
  }

  /* Ensure horizontal layout and no wrapping */
  flex-direction: row;
  flex-wrap: nowrap;
`;

const VideoItemComponent = styled.div`
  min-width: 220px;  /* Set fixed width for each card */
  max-width: 220px;
  flex: 0 0 auto;
  margin-right: 20px;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #1e1e1e;  /* Background for a card-like effect */
  padding: 10px;
  border-radius: 10px;  /* Rounded corners for a clean look */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.05);  /* Slight zoom effect on hover */
  }
`;

const Thumbnail = styled.img`
  width: 200px;  /* Constrain the thumbnail to a fixed size */
  height: 150px;
  border-radius: 8px;
  object-fit: cover;  /* Ensure aspect ratio is preserved */
  margin-bottom: 10px;
`;

const VideoTitle = styled.h3`
  font-size: 1.1em;
  margin: 10px 0 5px;
  text-align: center;
  color: #fff;
`;

const VideoDescription = styled.p`
  font-size: 0.9em;
  color: #ccc;
  max-width: 200px;
  text-align: center;
`;

const VideoTimeline = forwardRef(({ videoData, onSelectVideo }, ref) => {
  const scrollRef = useRef();
  const itemRefs = useRef([]);

  useImperativeHandle(ref, () => ({
    scrollToIndex: (index) => {
      if (index >= 0 && index < itemRefs.current.length) {
        const element = itemRefs.current[index];
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
          });
        }
      }
    }
  }));

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <TimelineContainer>
      <NavButton $left onClick={scrollLeft}>
        <FaChevronLeft />
      </NavButton>
      <NavButton onClick={scrollRight}>
        <FaChevronRight />
      </NavButton>

      <VideoList ref={scrollRef}>
        {videoData.map((yearData) =>
          yearData.videos.map((video, index) => (
            <VideoItemComponent
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => onSelectVideo(video)}
            >
              <Thumbnail src={video.thumbnail} alt={video.title} />
              <VideoTitle>{video.title}</VideoTitle>
              <VideoDescription>{video.description}</VideoDescription>
            </VideoItemComponent>
          ))
        )}
      </VideoList>
    </TimelineContainer>
  );
});

export default VideoTimeline;
