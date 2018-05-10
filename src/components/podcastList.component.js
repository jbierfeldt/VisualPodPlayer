import React from 'react';

import Details from './details.component.js';
import Progress from './progress.component.js';
import Player from './player.component.js';

class PodcastList extends React.Component {
  constructor(props) {
    super(props);

    this.defaultFeeds = [
      {title: "Chompers", url: "http://feeds.gimletmedia.com/chompers"},
      {title: "Reply All", url: "http://feeds.gimletmedia.com/hearreplyall"},
      {title: "The Nook", url: "http://sandbox.bierfeldt.me/podtest/files/rss.xml"}
    ]
  }
  render(){

    const feedRows = [];
    for (let i = 0; i < this.defaultFeeds.length; i++) {
      feedRows.push(
        <li>
        <div style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}}
        onClick={() => this.props.onParseFeedUrl(this.defaultFeeds[i].url)}>
          {this.defaultFeeds[i].title}
        </div>
        </li>
      )
    }

    return(
      <div>
        <ul>{feedRows}</ul>
      </div>
    )
  }

}

export default PodcastList
