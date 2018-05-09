// Import React
import React from 'react';

// Import ClassNames
import ClassNames from 'classnames';

// Player component class
class Player extends React.Component {

  render(){
    // Dynamic class names with ClassNames
    const playPauseClass = ClassNames({
      'fa fa-play': this.props.playStatus == 'PLAYING' ? false : true,
      'fa fa-pause': this.props.playStatus == 'PLAYING' ? true : false
    });

    // Return JSX
    return(
      <div className="player">
        {/*Rewind Button*/}
        <div className="player__backward">
          <button onClick={this.props.backward}><i className="fa fa-angle-double-left"></i></button>
        </div>
        <div className="player__main">
          {/*Play/Pause Button*/}
          <button onClick={this.props.togglePlay}><i className={playPauseClass}></i></button>
        </div>
        {/*Forward Button*/}
        <div className="player__forward">
          <button onClick={this.props.forward}><i className="fa fa-angle-double-right"></i></button>
        </div>
      </div>
    )
  }

}

// Export Player
export default Player
