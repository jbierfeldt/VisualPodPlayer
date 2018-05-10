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

    const relativeCoords = (event) => {
      const bounds = event.target.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const pos = (x / bounds.width);
      return pos;
    }

    return(
      <div className="progress-wrapper">
        {/* Elapsed time */}
        <span className="player__time-elapsed">{this.props.elapsed}</span>
        {/* Progress Bar */}
        <div onClick={relativeCoords} className="progress" style={{margin: '0 auto', width: '50%'}}>
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
            height: 'inherit'}}
            aria-valuenow={this.props.progress * 100}
            aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
        {/*}<progress
           value={this.props.progress}
           max="1"></progress>
        */}
         <span className="player__time-total">{this.props.total}</span>
      </div>
    )
  }

}

//Export Progress
export default Progress
