import React from 'react';

import {formatMilliseconds} from '../../utils/time.js';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Line extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("trans line mount");
    this.props.onUpdateScroll();
  }

  render() {
    return (
      <div className="transcript-line-container">
        <div className="transcript-speaker-id">
          <img className="speaker-portrait" onLoad={this.props.onImageLoad} src={this.props.speaker.portraitUrl} />
          <span className="speaker-name">
            {this.props.speaker.shortname}
          </span>
        </div>
        <div className="transcript-line-content">
          {this.props.words}
        </div>
      </div>
    )
  }
}

const Word = (props) => (
  <span className="transcript-word">
    {props.text + " "}
  </span>
);

class TranscriptCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let lines = [];

    if (this.props.data.words) {
      lines = this.props.data.words.map((line, index) => {
        if ((this.props.position - this.props.data.timestamp) > line.offset) {
          const words = line.words.map((word, index) => {
            if ((this.props.position - this.props.data.timestamp) > word.offset) {
              return (<Word key={index} text={word.text} />);
            }
          });
          return (
            <Line key={index} speaker={this.props.timelineData.speakers[line.speaker]}
            words={words}
            onUpdateScroll={this.props.onUpdateScroll}
            onImageLoad={this.props.onImageLoad} />
          )
        }
      });
    }

    return (
      <div className="card">
      <div className="card-header d-flex w-100 justify-content-between">
        <small>{formatMilliseconds(this.props.data.timestamp)}</small>
        <span><i className="fa fa-comment"></i></span>
      </div>
        {this.props.data.image
          ? <img className="card-img-top" onLoad={this.props.onImageLoad} src={this.props.data.image.file} alt={this.props.data.image.caption} />
          : null
        }
        <div className="card-body">
          {this.props.data.words
            ?
            <ReactCSSTransitionGroup component="div" className="transcript-container"
              transitionName="card"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}>

              {lines}
            </ReactCSSTransitionGroup>
            : <p>{this.props.data.text}</p>
          }
        </div>
      </div>
    )
  }
}

export default TranscriptCard
