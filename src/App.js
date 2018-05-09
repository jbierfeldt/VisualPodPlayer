import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Footer from './components/footer.component.js';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Sound from 'react-sound';

//Import Container component
import PlayerContainer from './containers/player.container';
import FeedContainer from './containers/feed.container';


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
      progress: 0
    }

    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleForward = this.handleForward.bind(this);
    this.handleBackward = this.handleBackward.bind(this);
    this.handleLoadEpisode = this.handleLoadEpisode.bind(this);
  }

  handleSongPlaying(audio) {
    this.setState({
      elapsed: this.formatMilliseconds(audio.position),
      total: this.formatMilliseconds(audio.duration),
      progress: audio.position / audio.duration,
      position: audio.position,
    });
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
      track: {
        title: data.title,
        streamUrl: data.url,
        artworkUrl: data.image}
      });
    console.log(this.state);
  }

  formatMilliseconds(milliseconds) {
    // Format hours
    var hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;

    // Format minutes
    var minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;

    // Format seconds
    var seconds = Math.floor(milliseconds / 1000);
    milliseconds = Math.floor(milliseconds % 1000);

    // Return as string
    return (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    console.log(this.state);
    return (
      <Router>
      <div>
      <Sound
      url={this.state.track.streamUrl}
      playStatus={this.state.playStatus}
      onPlaying={this.handleSongPlaying.bind(this)}
      onFinishedPlaying={this.handleSongFinished.bind(this)}
      position={this.state.position}
      />
      <ul>
      <li><Link to="/">Player</Link></li>
      <li><Link to="/feed">My Feed</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" render={() =>
        <PlayerContainer
          onTogglePlay={this.handleTogglePlay}
          onStop={this.handleStop}
          onForward={this.handleForward}
          onBackward={this.handleBackward}
          position={this.state.position}
          elapsed={this.state.elapsed}
          total={this.state.total}
          track={this.state.track}
          progress={this.state.progress}
          playStatus={this.state.playStatus}
        />
      }/>
      <Route path="/feed" render={() =>
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
        elapsed={this.state.elapsed}
        total={this.state.total}
      />
      </div>
      </Router>
    );
  }
}

export default App;
