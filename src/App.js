// src/App.js
import React, { useState, useRef } from 'react';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';
import musicData from './data/musicData';
import Header from './components/Header';
import Timeline from './components/Timeline';
import MusicPlayer from './components/MusicPlayer';
import Videos from './components/Videos';
import Games from './components/Games';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  padding: 20px 0;
`;

const PageLinks = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.1em;
  color: #666;
`;

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const timelineRef = useRef();
  const allTracks = musicData.flatMap((yearData) => yearData.tracks);

  const handleSelectTrack = (track, index) => {
    setCurrentTrack(track);
    setCurrentTrackIndex(index);
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <ContentWrapper>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h2 style={{ textAlign: 'center' }}>Music Collection</h2>
                  <Description>
                    The music repository here is purposed with storing the various recordings created by Jared Menard or his father, Kim Menard. All of the music here is self-produced and has never been promoted in any significant way to the general public. All the tracks are freely downloadable and we hope that you find something enjoyable.
                  </Description>
                  <Timeline
                    ref={timelineRef}
                    musicData={musicData}
                    onSelectTrack={handleSelectTrack}
                  />
                  <MusicPlayer
                    track={currentTrack}
                    trackIndex={currentTrackIndex}
                    tracks={allTracks}
                    onSelectTrack={handleSelectTrack}
                    scrollToIndex={(index) => timelineRef.current.scrollToIndex(index)}
                  />
                  <PageLinks>
                    <Link to="/videos">Videos</Link> | <Link to="/games">Games</Link>
                  </PageLinks>
                </>
              }
            />
            <Route path="/videos" element={<Videos />} />
            <Route path="/games" element={<Games />} />
          </Routes>
        </ContentWrapper>
      </AppContainer>
    </>
  );
}

export default App;
