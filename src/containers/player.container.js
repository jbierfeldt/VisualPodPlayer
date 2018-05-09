// React library
import React from 'react';

import Details from '../components/details.component.js';

// PlayerContainer class
class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log("player container", this.props);
  }
  // Render method
  render () {
    const background = {
      background: `url(${this.props.track.artworkUrl}) no-repeat top center`
      // backgroundSize: '500px'
    };
    return (
      <div className="mainContainer">
        <p>Data from Timeline will be displayed here</p>
        {this.props.track.streamUrl ?
          <div className="playerContainer" style={background}>
            <Details title={this.props.track.title} />
          </div>
          :
          <p>Go load an episode from the feeds tab!</p>
        }
      </div>
    );
  }
}

// Export AppContainer Component
export default PlayerContainer
