import React from 'react';
import styled from 'styled-components';
import ReactHowler from 'react-howler';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: calc(100% - 20px);  /* 10px padding on both sides */
  background-color: #1e1e1e;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PlayerInnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1080px;
  padding: 0 10px;  /* Padding between elements */
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  color: #f39c12;
  font-size: 1.5em;
  margin-right: 10px;  /* 10px consistent spacing */
  cursor: pointer;
  &:disabled {
    color: #555;
    cursor: not-allowed;
  }
`;

const TrackTitleContainer = styled.div`
  width: 200px;  /* Set fixed width for title scrolling */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TrackTitle = styled.span`
  font-size: 1em;
  margin-left: 10px;  /* Consistent spacing */
  display: inline-block;
  animation: scroll-title 10s linear infinite;  /* Autoscroll if title is too long */
  
  @keyframes scroll-title {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
`;

const ProgressBar = styled.input`
  flex: 1;
  margin: 0 10px;  /* Padding on both sides */
  max-width: 300px;  /* Ensure the slider is compact but effective */
`;

const TimeDisplay = styled.span`
  font-size: 0.9em;
  color: #ccc;
  margin-left: 10px;  /* Consistent spacing */
`;

const DownloadButton = styled.a`
  margin-left: 10px;  /* Consistent spacing */
  color: #f39c12;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SkipButton = styled.button`
  background: none;
  border: none;
  color: #f39c12;
  font-size: 1.5em;
  margin-left: 10px;  /* Consistent spacing */
  cursor: pointer;
  &:disabled {
    color: #555;
    cursor: not-allowed;
  }
`;

const PreviousButton = styled.button`
  background: none;
  border: none;
  color: #f39c12;
  font-size: 1.5em;
  margin-right: 10px;  /* Consistent spacing */
  cursor: pointer;
  &:disabled {
    color: #555;
    cursor: not-allowed;
  }
`;

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true, // Start playing automatically
      loaded: false,
      duration: 0,
      currentTime: 0,
    };
    this.playerRef = React.createRef();
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.updateTime, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate(prevProps) {
    if (this.props.track !== prevProps.track) {
      this.setState({
        playing: true, // Autoplay on new track
        loaded: false,
        duration: 0,
        currentTime: 0,
      });
    }
  }

  updateTime() {
    if (this.playerRef.current && this.playerRef.current.howler) {
      const currentTime = this.playerRef.current.howler.seek();
      this.setState({ currentTime });
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (this.playerRef.current && this.playerRef.current.howler) {
      this.playerRef.current.howler.seek(newTime);
      this.setState({ currentTime: newTime });
    }
  };

  handleEnd = () => {
    this.skipTrack();
  };

  skipTrack = () => {
    const { trackIndex, onSelectTrack, tracks, scrollToIndex } = this.props;
    if (Array.isArray(tracks) && trackIndex !== undefined) {
      let nextTrackIndex = trackIndex + 1;
      if (nextTrackIndex >= tracks.length) {
        nextTrackIndex = 0;
      }
      onSelectTrack(tracks[nextTrackIndex], nextTrackIndex);
      scrollToIndex(nextTrackIndex);
    }
  };

  previousTrack = () => {
    const { trackIndex, onSelectTrack, tracks, scrollToIndex } = this.props;
    if (Array.isArray(tracks) && trackIndex !== undefined) {
      let prevTrackIndex = trackIndex - 1;
      if (prevTrackIndex < 0) {
        prevTrackIndex = tracks.length - 1;
      }
      onSelectTrack(tracks[prevTrackIndex], prevTrackIndex);
      scrollToIndex(prevTrackIndex);
    }
  };

  render() {
    const { track, trackIndex, tracks = [] } = this.props;
    const { playing, loaded, duration, currentTime } = this.state;
    if (!track || !track.src) {
      return null;
    }

    return (
      <PlayerContainer>
        <PlayerInnerContainer>
          <PreviousButton onClick={this.previousTrack}>
            <FaBackward />
          </PreviousButton>

          <PlayButton onClick={this.handlePlayPause}>
            {playing ? <FaPause /> : <FaPlay />}
          </PlayButton>

          <TrackTitleContainer>
            <TrackTitle>{track.title}</TrackTitle>
          </TrackTitleContainer>

          <ProgressBar
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={this.handleSeek}
            disabled={!loaded}
          />

          <TimeDisplay>
            {this.formatTime(currentTime)} / {this.formatTime(duration)}
          </TimeDisplay>

          <DownloadButton href={track.src} download>
            Download
          </DownloadButton>

          <SkipButton onClick={this.skipTrack}>
            <FaForward />
          </SkipButton>

          {track.src && (
            <ReactHowler
              src={track.src}
              playing={playing}
              ref={this.playerRef}
              onLoad={() => {
                const duration = this.playerRef.current.howler.duration();
                this.setState({ duration, loaded: true });
              }}
              onEnd={this.handleEnd}
            />
          )}
        </PlayerInnerContainer>
      </PlayerContainer>
    );
  }
}

export default MusicPlayer;
