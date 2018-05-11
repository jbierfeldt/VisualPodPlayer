import React from 'react';

import ClassNames from 'classnames';

class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  handleToggle () {
    this.setState(prevState => ({ visible: !prevState.visible }));
  }

  render(){

    const displayCard = (position, start) => (position >= start ? 'inherit': 'none');

    const quoteCard = (obj, key) => (
      <div key={key} class="card text-center" style={{display: displayCard(this.props.position,this.props.data.timestamp)}}>
        <div class="card-header">
          Quote
        </div>
        <div class="card-body">
          <p class="card-text">{obj.text}</p>
          <small>{obj.attribution}</small>
        </div>
      </div>
    );

    const blankCard = () => (
      <div class="card text-center" style={{display: displayCard(this.props.position,this.props.data.timestamp)}}>
        <div class="card-header">
          Quote
        </div>
        <div class="card-body">
          <p class="card-text"></p>
          <small></small>
        </div>
      </div>
    );

    const musicCard = (obj, key) => (
      <div key={key} class="card text-center" style={{display: displayCard(this.props.position,this.props.data.timestamp)}}>
        <div class="card-header">
          Music
        </div>
        <div class="card-body">
          <p class="card-text">{obj.album} - {obj.title}</p>
          <small>{obj.artist}</small>
        </div>
      </div>
    );

    return(
      <div>
      {this.props.data.type == "quote" ? quoteCard(this.props.data, this.props.key) : null}
      {this.props.data.type == "music" ? musicCard(this.props.data, this.props.key) : null}
      </div>
    )
  }

}

export default Card
