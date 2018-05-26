// React library
import React from 'react';
import ClassNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {formatMilliseconds, isActive} from '../utils/time.js';

import Card from '../components/cards/card.component.js';
import CardStack from '../components/cardstack.component.js';
import FeedContainer from './feed.container.js';

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

        // don't display current chapter as card
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

    if (this.props.timeline) {
      return <CardStack cards={cards} />;
    } else {
      return <p>No Timeline data to display :(</p>
    }
  }
}

// Export AppContainer Component
export default PlayerContainer
