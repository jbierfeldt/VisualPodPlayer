// Import React
import React from 'react';

import ClassNames from 'classnames';


// Create Progress component class
class Progress extends React.Component {

  // Render method
  render() {

    // Dynamic class names with ClassNames
    const bufferClass = ClassNames({
      'progress-bar progress-bar-striped': true,
      'progress-bar-animated': this.props.buffer == true
    });

    const getSeekPosition = (event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const pos = (x / bounds.width);
      console.log("progress", pos);
      this.props.onSeek(pos);
    }

    return(
      <div className="progress-wrapper" style={{display: 'flex'}}>
        {/* Elapsed time */}
        <span className="player__time-elapsed" style={{paddingLeft: '10px'}}>{this.props.elapsed}</span>
        {/* Progress Bar */}
        <div onClick={getSeekPosition} className="progress" style={{margin: '0 auto', width: '80%', position: 'relative', height: '2rem'}}>
          <div className={bufferClass} role="progressbar" style={{
            width: (this.props.loadProgress * 100) + "%",
            backgroundColor: 'rgba(244, 116, 59, 0.3)'}}
            aria-valuenow={this.props.loadProgress * 100}
            aria-valuemin="0" aria-valuemax="100">
          </div>
          <div className="progress-bar" role="progressbar" style={{
            width: (this.props.progress * 100) + "%",
            backgroundColor: 'rgb(244, 116, 59)',
            position: 'absolute',
            height: 'inherit',
            maxWidth: 'inherit'}}
            aria-valuenow={this.props.progress * 100}
            aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
        {/*}<progress
           value={this.props.progress}
           max="1"></progress>
        */}
         <span className="player__time-total" style={{paddingRight: '10px'}}>{this.props.total}</span>
      </div>
    )
  }

}

//Export Progress
export default Progress
