import React, { Component } from 'react';

import Axios from 'axios';

import Sound from 'react-sound';

import './App.css';

import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

import Nav from './components/nav.component';
import Footer from './components/footer.component';
import SlideOut from './components/slideOut.component';

import {
  MemoryRouter as Router,
  Route
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
      timeline: null,
      sliderIsOpen: true
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
    getTimelineJson('./timeline.json', (data) => {this.setState({timeline: data})});
    this.handleLoadEpisode(
      {
        dur: 260,
        title: "The Weed Brownies",
        url: "./ep1.mp3"
      }
    )
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
    this.setState({
      loadProgress: sound.bytesLoaded,
      buffer: sound.isBuffering
    })
  }

  // expects pos in milliseconds
  handleJumpTo (pos) {
    this.setState({
      position: pos,
      progress: pos / this.state.duration,
      elapsed: formatMilliseconds(pos)
    })
  }

  // expects pos as a ratio
  handleSeek (pos) {
    const targetPosition = this.state.duration * pos;
    this.setState({
      position: targetPosition,
      progress: targetPosition / this.state.duration,
      elapsed: formatMilliseconds(targetPosition)
    })
  }

  handleSongFinished () {
    // Call random Track
    // this.randomTrack();
  }

  handleTogglePlay(){
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

      // mixes in an end property for use with the player
      mixInEndStamp(response.data.annotations, response.data.audio_duration);

      _this.setState({
        timeline: response.data
      });

    })
    .catch(function (err) {
      // If something goes wrong, let us know
      console.log(err);
    });
  }

  render() {
    return (
        <div className="container-fluid">
          <Sound
          url={this.state.track.streamUrl}
          playStatus={this.state.playStatus}
          onPlaying={this.handleSongPlaying.bind(this)}
          onLoading={this.handleSongLoading.bind(this)}
          autoLoad={true}
          onFinishedPlaying={this.handleSongFinished.bind(this)}
          position={this.state.position}
          />

          <div className="row">

            {this.state.sliderIsOpen
            ?
              <div id="slide-container" className="col-xs-auto" style={{backgroundColor: 'lightblue'}}>
                <SlideOut
                  onLoadEpisode={this.handleLoadEpisode}
                  onTogglePlay={this.handleTogglePlay}
                  onForward={this.handleForward}
                  onBackward={this.handleBackward}
                />
              </div>
            :
              null
            }

            <div id="player-container" className="col" style={{backgroundColor: 'lightgrey'}}>
              <PlayerContainer
              track={this.state.track}
              timeline={this.state.timeline}
              position={this.state.position}
              onJumpTo={this.handleJumpTo}
              />
            </div>

          </div>

      {/* <Nav /> */}

      {/*
        <Route exact path="/" render={() =>
        <PlayerContainer
          track={this.state.track}
          timeline={this.state.timeline}
          position={this.state.position}
          onJumpTo={this.handleJumpTo}
        />

      }/>
      <Route path="/feeds" render={() =>
        <FeedContainer
          onLoadEpisode={this.handleLoadEpisode}
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
      */}

        </div>
    );
  }
}

export default App;
