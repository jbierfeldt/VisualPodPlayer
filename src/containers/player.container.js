// React library
import React from 'react';

import ClassNames from 'classnames';

import Details from '../components/details.component.js';
import Card from '../components/card.component.js';

import {formatMilliseconds} from '../utils/time.js';

// PlayerContainer class
class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log("player container", this.props);

    this.state = {
      activeAnnotation: null
    }
  }
  // Render method
  render () {

    const background = {
      background: `url(${this.props.track.artworkUrl}) no-repeat top center`
      // backgroundSize: '500px'
    };

    const chapters = [];
    const cards = [];

    if (this.props.timeline) {
      for (let i = 0; i < this.props.timeline.annotations.length; i++) {

        const activeClass = ClassNames({
          'list-group-item list-group-item-action flex-column align-items-start': true,
          'active': (this.props.timeline.annotations[i].timestamp <= this.props.position &&
            this.props.position < this.props.timeline.annotations[i].end)
        });

        chapters.push(

          <a key={i} style={{cursor: 'pointer'}} class={activeClass} onClick={() => this.props.onJumpTo(this.props.timeline.annotations[i].timestamp)}>
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{this.props.timeline.annotations[i].title}</h5>
              <small>{formatMilliseconds(this.props.timeline.annotations[i].timestamp)}</small>
            </div>
            <p class="mb-1">{this.props.timeline.annotations[i].summary}</p>
          </a>

        )

        const children = this.props.timeline.annotations[i].annotations;

        for (let j = 0; j < children.length; j++) {

          console.log(children[j]);
          cards.push(<Card position={this.props.position}
            data={children[j]}
            key={`a-${i}-${j}`} />);
        }
      }
    }
    return (
      <div className="container mainContainer">
        {this.props.timeline ?
          <div className="row">
            <div className="col-3">
              <div className="list-group">
                {chapters}
              </div>
            </div>
            <div className="col-9">
              {cards}
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
