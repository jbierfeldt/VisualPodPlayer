// React library
import React from 'react';

import Axios from 'axios';

import parsePodcast from 'node-podcast-parser';

import Search from '../components/search.component.js'

// PlayerContainer class
class FeedContainer extends React.Component {
  // PlayerContainer constructor
  constructor(props) {
    super(props);
    console.log("ev");
    this.feedUrl = 'http://sandbox.bierfeldt.me/podtest/files/rss.xml';
    // this.feedUrl = 'http://feeds.gimletmedia.com/chompers';
    // this.feedUrl = 'http://feeds.gimletmedia.com/hearreplyall';

    this.defaultFeeds = [
      {title: "Chompers", url: "http://feeds.gimletmedia.com/chompers"},
      {title: "Reply All", url: "http://feeds.gimletmedia.com/hearreplyall"},
      {title: "The Nook", url: "http://sandbox.bierfeldt.me/podtest/files/rss.xml"}
    ]

    this.state = {
      title: null,
      desc: null,
      imageUrl: null,
      episodes: []
    }

    this.handleOnSearch = this.handleOnSearch.bind(this);
  }

  // componentDidMount lifecycle method. Called once a component is loaded
  // componentDidMount() {
  //   // this.parseFeedUrl(this.feedUrl);
  // }

  handleOnSearch (url) {
    this.parseFeedUrl(url);
  }

  parseFeedUrl (url) {
    let _this = this;
    if (process.env.NODE_ENV === 'development') {
      url = 'http://localhost:5000/podcast?url=' + url;
    }
    console.log(url);

    Axios.get(url)
    .then(function (response) {

      // parse Podcast xml into js Object
      parsePodcast(response.data, (err, data) => {

        if (err) {
          console.error(err);
          return;
        } else {
          _this.setState({
            title: data.title,
            desc: data.description.long,
            imageUrl: data.image,
            episodes: []
          });

          for (let i = 0; i < data.episodes.length && i < 10; i++) {
            _this.setState({episodes: [..._this.state.episodes,
              {
                title: data.episodes[i].title,
                url: data.episodes[i].enclosure.url,
                imageUrl: data.image
              }
            ]});
          }
        }
      })

    })
    .catch(function (err) {
      // If something goes wrong, let us know
      console.log(err);
    });
  }

  // Render method
  render () {
    const feedRows = [];
    for (let i = 0; i < this.defaultFeeds.length; i++) {
      feedRows.push(
        <li>
        <div style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}}
        onClick={() => this.parseFeedUrl(this.defaultFeeds[i].url)}>
          {this.defaultFeeds[i].title}
        </div>
        </li>
      )
    }
    const episodesRows = [];
    for (let i = 0; i < this.state.episodes.length; i++) {
      episodesRows.push(
        <li>
          <div style={{color: 'blue', cursor: 'pointer', textDecoration: 'underline'}}
          onClick={() => this.props.onLoadEpisode({
          title: this.state.episodes[i].title,
          url: this.state.episodes[i].url,
          image: this.state.episodes[i].imageUrl
          })}>
            {this.state.episodes[i].title}
          </div>
        </li>
      )
    }
    return (
      <div className="mainContainer">
      <Search onSearch={this.handleOnSearch}/>
      <ul>{feedRows}</ul>
      <h3>{this.state.title}</h3>
      {this.state.desc}
      <img src={this.state.imageUrl} style={{height:'250px', width:'250px'}}/>
      <h3>Episodes:</h3>
      <ul>
      {episodesRows}
      </ul>

      </div>
    );
  }
}

// Export AppContainer Component
export default FeedContainer
