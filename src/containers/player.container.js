// React library
import React from 'react';

import ClassNames from 'classnames';

import Details from '../components/details.component.js';
import Card from '../components/cards/card.component.js';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {formatMilliseconds, isActive} from '../utils/time.js';

// PlayerContainer class
class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log("player container construct", this.props);
  }

  componentDidMount(props) {
    console.log("player container mount", this.props);
  }

  // Render method
  render () {
    console.log("Render Player Container render");

    let chapters = [];
    let cards = [];

    const getActiveClass = (audioPos, start, end) => ClassNames({
      'list-group-item list-group-item-action flex-column align-items-start': true,
      'active': (isActive(audioPos, start, end))
    });

    if (this.props.timeline) {
      const annotations = this.props.timeline.annotations;
      for (let i = 0; i < annotations.length; i++) {
        chapters.push(
          <a key={i}
          style={{cursor: 'pointer'}}
          className={getActiveClass(this.props.position, annotations[i].timestamp, annotations[i].end)}
          onClick={() => this.props.onJumpTo(annotations[i].timestamp)}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{annotations[i].title}</h5>
              <small>{formatMilliseconds(annotations[i].timestamp)}</small>
            </div>
            <p className="mb-1">{annotations[i].summary}</p>
          </a>
        );

        if (isActive(this.props.position, annotations[i].timestamp, annotations[i].end)) {
          cards.push(
            <Card key={i} position={this.props.position} timelineData={this.props.timeline} data={this.props.timeline.annotations[i]} />
          );
        }

        if (annotations[i].annotations) {
          for (let j = 0; j < annotations[i].annotations.length; j++) {
            if (isActive(this.props.position, annotations[i].annotations[j].timestamp, annotations[i].end)) {
              cards.push(
                <Card key={i+'-'+j} position={this.props.position} timelineData={this.props.timeline} data={this.props.timeline.annotations[i].annotations[j]} />
              );
            }
          }
        }
      }
    }

    return (
      <div className="container mainContainer" style={{maxWidth: "800px"}}>
        {this.props.timeline ?
          <div className="row">
            <div className="col-4 chapter-container">
              <div className="list-group sticky-top">
                {chapters}
              </div>
            </div>
            <div className="col-8 card-container">
            <ReactCSSTransitionGroup
              transitionName="card"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}>

              {cards}
            </ReactCSSTransitionGroup>
            </div>
          </div>
        :
        <p>No Timeline data to display :(</p>
        }
      </div>
    );
  }
}

// Export AppContainer Component
export default PlayerContainer
