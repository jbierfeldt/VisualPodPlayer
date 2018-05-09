// React library
import React from 'react';

// Sound component
import Sound from 'react-sound';

import Axios from 'axios';

import xml2js from 'xml2js';

import parsePodcast from 'node-podcast-parser';

import Player from '../components/player.component.js';

import Details from '../components/details.component.js';

import Progress from '../components/progress.component.js';

import Footer from '../components/footer.component.js';

// PlayerContainer class
class PlayerContainer extends React.Component {
  // Render method
  render () {
    const background = {
      background: `url(${this.props.track.artworkUrl}) no-repeat center center`,
    }
    return (
      <div className="visual-player" style={background}>
      <Details title={this.props.track.title} />
      </div>
    );
  }
}

// Export AppContainer Component
export default PlayerContainer
