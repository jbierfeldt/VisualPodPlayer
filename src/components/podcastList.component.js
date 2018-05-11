import React from 'react';

import Details from './details.component.js';
import Progress from './progress.component.js';
import Player from './player.component.js';

class PodcastList extends React.Component {
  constructor(props) {
    super(props);

    this.defaultFeeds = [
      {title: "Chompers", url: "http://feeds.gimletmedia.com/chompers", imgurl: "http://static.megaphone.fm/podcasts/208abfce-db93-11e7-afc4-c73249f170d7/image/uploads_2F1518621984376-qx1x7qmsl9e-209e6d1a8f10061fe232f3edce0136bb_2F00-chompers-final.jpg"},
      {title: "Reply All", url: "http://feeds.gimletmedia.com/hearreplyall", imgurl: "http://static.megaphone.fm/podcasts/05f71746-a825-11e5-aeb5-a7a572df575e/image/uploads_2F1516902193862-jqkml22bswo-cee641b4533ddb31a5a7ab656fe45116_2FCURRENT_Reply%2BAll%2BLogo.png"},
      {title: "The Nook", url: "http://sandbox.bierfeldt.me/podtest/files/rss.xml", imgurl: "http://sandbox.bierfeldt.me/podtest/files/logo.jpg"}
    ]
  }
  render(){

    const feedRows = [];
    for (let i = 0; i < this.defaultFeeds.length; i++) {
      feedRows.push(
        <div className="col-4" style={{cursor: 'pointer'}}
        onClick={() => this.props.onParseFeedUrl(this.defaultFeeds[i].url)}>
          <img src={this.defaultFeeds[i].imgurl} style={{width:'80%'}}/>
        </div>
      )
    }

    return(
      <div className="jumbotron">
      <div className="row">
        <div className="col-12">
          <h4>Podcasts already using Timeline Format</h4>
        </div>
      </div>
      <div className="row">
        {feedRows}
      </div>
      </div>
    )
  }

}

export default PodcastList
