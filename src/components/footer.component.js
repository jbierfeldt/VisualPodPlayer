import React from 'react';

import Details from './details.component.js';
import Progress from './progress.component.js';
import Player from './player.component.js';

class Footer extends React.Component {
  render(){

    return(
      <div className="footer">
        <Details title={this.props.track.title} />
        <Progress
          progress={this.props.progress}
          loadProgress={this.props.loadProgress}
          elapsed={this.props.elapsed}
          total={this.props.total}
          buffer={this.props.buffer}
          onSeek={this.props.onSeek}
        />
        <Player
        togglePlay={this.props.onTogglePlay}
        stop={this.props.onStop}
        playStatus={this.props.playStatus}
        forward={this.props.onForward}
        backward={this.props.onBackward}
        />
      </div>
    )
  }

}

export default Footer
