import React from 'react';

import Details from './details.component.js';
import Progress from './progress.component.js';
import Player from './player.component.js';

class PodcastDetails extends React.Component {
  render(){

    const episodesRows = [];
    for (let i = 0; i < this.props.episodes.length; i++) {
      episodesRows.push(
        <li>
          <div style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}}
          onClick={() => this.props.onLoadEpisode({
          title: this.props.episodes[i].title,
          url: this.props.episodes[i].url,
          image: this.props.episodes[i].imageUrl
          })}>
            {this.props.episodes[i].title}
          </div>
        </li>
      )
    }

    return(
      <div>
      <h3>{this.props.title}</h3>
      <p>{this.props.desc}</p>
      <img src={this.props.imageUrl} style={{height:'250px', width:'250px'}}/>
      <h3>Episodes:</h3>
      <ul>
      {episodesRows}
      </ul>
      </div>
    )
  }

}

export default PodcastDetails
