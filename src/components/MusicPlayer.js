import React from 'react';
import styled from 'styled-components';
import ReactHowler from 'react-howler';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 75%;
  background-color: #1e1e1e;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PlayerInnerContainer = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const TrackTitle = styled.span`
  font-size: 1em;
  margin-left: 20px;
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  color: #f39c12;
  font-size: 1.5em;
  margin-right: 10px;
  cursor: pointer;
  &:disabled {
    color: #555;
    cursor: not-allowed;
  }
`;

const ProgressBar = styled.input`
  flex: 1;
  margin: 0 10px;
`;

const TimeDisplay = styled.span`
  font-size: 0.9em;
  color: #ccc;
  margin-left: 10px;
`;

const DownloadButton = styled.a`
  margin-left: 20px;
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
  margin-left: 10px;
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
  margin-right: 10px;
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
    this.setState({ playing: !this.state.playing }, () => {
    });
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
        // Loop back to the first track if at the last track
        if (nextTrackIndex >= tracks.length) {
            nextTrackIndex = 0;
        }

        onSelectTrack(tracks[nextTrackIndex], nextTrackIndex);
        scrollToIndex(nextTrackIndex); 
    }
};

  previousTrack = () => {
    const { trackIndex, onSelectTrack, tracks, scrollToIndex } = this.props;
    console.log("Previous clicked.");
    // Ensure tracks is an array and trackIndex is defined
    if (Array.isArray(tracks) && trackIndex !== undefined) {
        let prevTrackIndex = trackIndex - 1;

        // Loop back to the last track if at the first track
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
    // Check if track and track.src are valid
    if (!track || !track.src) {
      return;
    }

    return (
      <PlayerContainer>
        <PlayerInnerContainer>
          <Controls>
            <PlayButton onClick={this.handlePlayPause}>
              {playing ? <FaPause /> : <FaPlay />}
            </PlayButton>

            <TrackTitle>{track.title}</TrackTitle>

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
            <PreviousButton onClick={this.previousTrack}>
              <FaBackward />
            </PreviousButton>

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
          </Controls>
        </PlayerInnerContainer>
      </PlayerContainer>
    );
}

}

export default MusicPlayer;
