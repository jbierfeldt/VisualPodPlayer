// React library
import React from 'react';

// Sound component
import Sound from 'react-sound';

import Axios from 'axios';

import xml2js from 'xml2js';

import parsePodcast from 'node-podcast-parser';

import Footer from '../components/footer.component.js';

// PlayerContainer class
class FeedContainer extends React.Component {
  // PlayerContainer constructor
  constructor(props) {
    super(props);
    // this.feedUrl = 'http://sandbox.bierfeldt.me/podtest/files/rss.xml';
    this.feedUrl = 'http://localhost:5000/podcast?url=http://feeds.gimletmedia.com/chompers';

    this.state = {
      title: null,
      desc: null,
      imageUrl: null,
      episodes: []
    }
  }

  // componentDidMount lifecycle method. Called once a component is loaded
  componentDidMount() {
    console.log(this.props);
    this.parseFeed();
  }

  parseFeed () {
    let _this = this;
    let url = this.feedUrl;
    console.log(url);

    Axios.get(`${this.feedUrl}`)
    .then(function (response) {
      // console.log(response.data);
      parsePodcast(response.data, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(data);

        _this.setState({
          title: data.title,
          desc: data.description.long,
          imageUrl: data.image
        })

        for (let i = 0; i < data.episodes.length && i < 10; i++) {
          _this.state.episodes.push({title: data.episodes[i].title, url: data.episodes[i].enclosure.url});
        }

        // const podData = {};
        //
        // podData.image = data.image;
        // podData.url = data.episodes[0].enclosure.url;
        // podData.title = data.episodes[0].title;
        // // data looks like the format above
        // {_this.props.onLoadEpisode(podData)}
        // _this.setState({pod: JSON.stringify(data), track: {title: data.episodes[0].title, streamUrl: data.episodes[0].enclosure.url, artworkUrl: data.image}});
      });
      // _this.setState({title: response.data});

    })
    .catch(function (err) {
      // If something goes wrong, let us know
      console.log(err);
    });
  }

  // Render method
  render () {
    const episodesRows = [];
    console.log(this.state.episodes);
    for (let i = 0; i < this.state.episodes.length; i++) {
      console.log(this.state.episodes[i]);
      episodesRows.push(<li><a href="#" onClick={() => this.props.onLoadEpisode({title: this.state.episodes[i].title, url: this.state.episodes[i].url})}>{this.state.episodes[i].title}</a></li>)
    }
    return (
      <div style={{overflow: 'scroll'}}>
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
