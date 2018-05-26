// React library
import React from 'react';
import ClassNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {formatMilliseconds, isActive} from '../utils/time.js';

import Card from '../components/cards/card.component.js';
import CardStack from '../components/cardstack.component.js';

// PlayerContainer class
class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(props) {
  }

  // Render method
  render () {

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
      <div className="container view-container">
        {this.props.timeline ?
          <div className="row">
            <div className="col-4 chapter-container sticky-top align-self-start">
              <div className="list-group">
                {chapters}
              </div>
            </div>
            <CardStack cards={cards} />
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
