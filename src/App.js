import React, { Component } from 'react';

import Axios from 'axios';

import Sound from 'react-sound';

import logo from './logo.svg';
import './App.css';

import Nav from './components/nav.component.js';
import Footer from './components/footer.component.js';

import {
  MemoryRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import {formatMilliseconds, mixInEndStamp} from './utils/time.js';

//Import Container component
import PlayerContainer from './containers/player.container';
import FeedContainer from './containers/feed.container';

import {getTimelineJson} from './utils/debug.js';

class App extends Component {
  constructor(props) {
    super(props);
    // this.feedUrl = 'http://sandbox.bierfeldt.me/podtest/files/rss.xml';
    // this.feedUrl = 'http://localhost:5000/podcast?url=http://feeds.gimletmedia.com/chompers.xml';
    // this.feedUrl = 'http://localhost:5000/podcast?url=http://sandbox.bierfeldt.me/podtest/files/podcast.xml';
    // Initial State
    this.state = {
      track: {streamUrl: '', timelineUrl: '', title: '', artworkUrl: ''},
      playStatus: Sound.status.STOPPED,
      elapsed: '00:00',
      total: '00:00',
      position: 0,
      duration: 0,
      progress: 0,
      loadProgress: 0,
      buffer: false,
      timeline: null
    }

    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleForward = this.handleForward.bind(this);
    this.handleBackward = this.handleBackward.bind(this);
    this.handleLoadEpisode = this.handleLoadEpisode.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleJumpTo = this.handleJumpTo.bind(this);
  }

  componentDidMount() {
    console.log('loaded');
    // getTimelineJson('./timeline.json', (data) => {this.setState({timeline: data})});
    // this.handleLoadEpisode(
    //   {
    //     dur: 260000,
    //     tite: "Test Song",
    //     url: "./ep1.mp3"
    //   }
    // )
  }

  handleSongPlaying(audio) {
    this.setState({
      elapsed: formatMilliseconds(audio.position),
      total: formatMilliseconds(audio.duration),
      progress: audio.position / audio.duration,
      position: audio.position,
      duration: audio.duration
    });
  }

  handleSongLoading(sound) {
    console.log("buffering?", sound);
    this.setState({
      loadProgress: sound.bytesLoaded,
      buffer: sound.isBuffering
    })
  }

  // expects pos in milliseconds
  handleJumpTo (pos) {
    this.setState({
      position: pos,
      progress: pos / this.state.duration
    })
  }

  // expects pos as a ratio
  handleSeek (pos) {
    console.log("app", pos, this.state.duration);
    const targetPosition = this.state.duration * pos;
    this.setState({
      position: targetPosition
    })
  }

  handleSongFinished () {
    // Call random Track
    // this.randomTrack();
  }

  handleTogglePlay(){
    // console.log(this);
    // Check current playing state
    if(this.state.playStatus === Sound.status.PLAYING){
      // Pause if playing
      this.setState({playStatus: Sound.status.PAUSED, position: this.state.position - 250})
    } else {
      // Resume if paused
      this.setState({playStatus: Sound.status.PLAYING})
    }
  }

  handleStop(){
    // Stop sound
    this.setState({playStatus: Sound.status.STOPPED, position: 0, progress: 0, elapsed: '00:00'});
  }

  handleForward(){
    this.setState({position: this.state.position+1000*10});
  }

  handleBackward(){
    this.setState({position: this.state.position-1000*10});
  }

  handleLoadEpisode(data) {
    this.setState({
      position: 0,
      progress: 0,
      elapsed: formatMilliseconds(0),
      duration: (data.dur * 1000),
      total: formatMilliseconds(data.dur * 1000), //convert to milliseconds
      track: {
        title: data.title,
        streamUrl: data.url,
        artworkUrl: data.image}
      });

    if (data.timelineUrl) {
      this.getTimelineObject(data.timelineUrl);
    } else {
      this.setState({
        timeline: null
      });
    }
  }

  getTimelineObject (timelineUrl) {
    const _this = this;
    Axios.get(timelineUrl)
    .then(function (response) {
      console.log("loaded timeline", response.data);

      // mixes in an end property for use with the player
      mixInEndStamp(response.data.annotations, response.data.audio_duration);

      _this.setState({
        timeline: response.data
      });

      console.log("fixed it up", _this.state.timeline);

    })
    .catch(function (err) {
      // If something goes wrong, let us know
      console.log(err);
    });
  }

  render() {
    console.log("Render App");
    return (
      <Router>
      <div>
      <Sound
      url={this.state.track.streamUrl}
      playStatus={this.state.playStatus}
      onPlaying={this.handleSongPlaying.bind(this)}
      onLoading={this.handleSongLoading.bind(this)}
      autoLoad={true}
      onFinishedPlaying={this.handleSongFinished.bind(this)}
      position={this.state.position}
      />

      <Nav />

      <Route exact path="/" render={() =>
        <FeedContainer
          onLoadEpisode={this.handleLoadEpisode}
        />
      }/>
      <Route path="/player" render={() =>
        <PlayerContainer
          track={this.state.track}
          timeline={this.state.timeline}
          position={this.state.position}
          onJumpTo={this.handleJumpTo}
        />
      }/>

      <Footer
        onTogglePlay={this.handleTogglePlay}
        onStop={this.handleStop}
        onForward={this.handleForward}
        onBackward={this.handleBackward}
        playStatus={this.state.playStatus}
        track={this.state.track}
        progress={this.state.progress}
        loadProgress={this.state.loadProgress}
        elapsed={this.state.elapsed}
        total={this.state.total}
        buffer={this.state.buffer}
        onSeek={this.handleSeek}
      />
      </div>
      </Router>
    );
  }
}

export default App;
