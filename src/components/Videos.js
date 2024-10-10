// src/components/Videos.js
import React, { useState } from 'react';
import styled from 'styled-components';
import VideoTimeline from './VideoTimeline';  // Use the new VideoTimeline component
import remindMeLaterThumbnail from '../assets/images/remind-me-later.jpg';
import wellBeFine from '../assets/images/well-be-fine.jpg';
import seeYouInAnotherLife from '../assets/images/see-you-in-another-life.jpg';
import whenISeeFriday from '../assets/images/when-i-see-friday.jpg';
import sleep from '../assets/images/sleep.jpg';
import loveILeanOnYou from '../assets/images/love-i-lean-on-you.jpg';
import theNoiseInMyHead from '../assets/images/the-noise-in-my-head.jpg';
import evenThoughIFailedBefore from '../assets/images/even-though-i-failed-before.jpg';
import whereTheTimeGoes from '../assets/images/where-the-time-goes.jpg';

// Placeholder video data
const videoData = [
  {
    year: '2023',
    videos: [
      { title: 'Remind Me Later', 
        src: 'https://www.youtube.com/embed/qC0s-doGKzw',
        thumbnail: remindMeLaterThumbnail,
        description: 'Jared\'s first attempt to produce a music video stars his cat, Mister Mouse. In this video, Mister Mouse is mildly annoyed by nonexistant lights while doing some of the hardest work ever - nothing at all. A celebration and approbation of laziness.'
      },
      { title: 'We\'ll Be Fine', 
        src: 'https://www.youtube.com/embed/299WYvLO4is',
        thumbnail: wellBeFine,
        description: 'The footage for "We\'ll Be Fine" was gathered from around the Kennedy Creek area in Mason County, WA. Jared was experimenting with different sorts of filtering and video editing techniques here, producing a kaleidoscopic adventure here with themes of water and sunlight. '
       },
      { title: 'See You In Another Life', 
        src: 'https://www.youtube.com/embed/lh0wFWofOYg',
        thumbnail: seeYouInAnotherLife,
        description: 'For video material to use for the next piece, Jared took video from around his own home in Olympia, WA. The majestic Douglas Firs encircle a production bursting with color. The major themes are spring and rebirth.'
       },
      ]
  },
  {
    year: '2024',
    videos: [
      { title: 'When I See Friday', 
        src: 'https://www.youtube.com/embed/hbIPv9EB7oo',
        thumbnail: whenISeeFriday,
        description: 'A journey to Westport, WA one weekend in early 2024 filled Jared with so much enthusiasm that he wanted to try and capture the excitement of "getting away from it all" using some self-produced footage from around the area. The theme is a celebration of letting stress go, however briefly.'
       },
      { title: 'Sleep', 
        src: 'https://www.youtube.com/embed/MjT5f4RaXZY',
        thumbnail: sleep,
        description: 'One listener of this song described the vocal performance as "attempted, and almost pulled off". An ode to sleep and the blissful cessation of all the noise, strife and petty inconvenience. Jared tries to use more dramatic musical elements here to nail a certain thing that many harrowed individuals already know very well.'
       },
      { title: 'Where the Time Goes', 
        src: 'https://www.youtube.com/embed/RFsWN2_irVg',
        thumbnail: whereTheTimeGoes,
        description: 'With "Where the Time Goes", Jared takes a first step into using public domain and open source video footage mixed with a few of his own; there are cameos by Mister Mouse again, who is far too photogenic to be kept away from the camera. Themes here are the chaos and swift-moving stream of life across a trek of many years.'
       },
      { title: 'Love, I Lean On You', 
        src: 'https://www.youtube.com/embed/B6sd7RDGsv0',
        thumbnail: loveILeanOnYou,
        description: 'The video for this song is assembled carefully from an edited version of Alexander Hammid\'s beautiful 1947 film, "The Private Life Of A Cat", which follows a litter of kittens being born to a mother and father cat in a small apartment. The song, which has some almost tolerable singing from Jared, is about the helplessness and beauty of devotion, and the nurturing of lives through love.'
       },
      { title: 'The Noise In My Head', 
        src: 'https://www.youtube.com/embed/_rVdvjNFxPw',
        thumbnail: theNoiseInMyHead,
        description: 'Another project made completely of stitched-together public domain film, some repetitive elements produce a little more of a feeling of "storytelling", which after the last project was an element Jared decided was essential in the video. The major theme of this instrumental piece is an attempted description of a certain mental state in which anything can take the form and function of a distraction, from the most sublime and peaceful to the violent.'
       },
      { title: 'Even Though I Failed Before', 
        src: 'https://www.youtube.com/embed/IItVA-jAarA',
        thumbnail: evenThoughIFailedBefore,
        description: 'This song is about learning how to keep on getting up and moving forward in spite of all odds, without any hope of success, because you have to be who you are. There is a certain strength in resignation, and though hope may become so tiny that its light can be smothered by the blink of an eye, it must always yet remain there growing like an ember.'
       }
    ]
  }
];

const VideosContainer = styled.div`
  padding: 20px;
  max-width: 1080px;
  margin: 0 auto;
`;

const Blurb = styled.p`
  text-align: center;
  font-size: 1.2em;
  color: #666;
  margin-bottom: 40px;
`;

const VideoEmbed = styled.iframe`
  width: 100%;
  height: 300px;
  margin-top: 10px;
  border: none;
`;

const VideoItem = styled.div`
  margin-bottom: 20px;
`;

const VideoTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
  text-align: center;
`;

const Videos = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  
  const handleSelectVideo = (video) => {
    setCurrentVideo(video);
  };

  return (
    <>
      <VideosContainer>
        <h2 style={{ textAlign: 'center' }}>Video Collection</h2>
        <Blurb>
          For the last few years, Jared has been making videos to go with his music. This page collects all of those in a single place. We hope you find something that you like here!
        </Blurb>

        <VideoTimeline
          videoData={videoData}  // Pass the video data
          onSelectVideo={handleSelectVideo}  // Select the video
        />

        {currentVideo && (
          <VideoItem>
            <VideoTitle>{currentVideo.title}</VideoTitle>
            <VideoEmbed src={currentVideo.src} allowFullScreen />
          </VideoItem>
        )}
      </VideosContainer>
    </>
  );
};

export default Videos;
