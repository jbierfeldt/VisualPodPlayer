// React library
import React from 'react';

import Axios from 'axios';

import parsePodcast from 'node-podcast-parser';

import Search from '../components/search.component.js'
import PodcastDetails from '../components/podcastDetails.component.js'
import PodcastList from '../components/podcastList.component.js'

// PlayerContainer class
class FeedContainer extends React.Component {
  // PlayerContainer constructor
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      desc: null,
      imageUrl: null,
      episodes: []
    }

    this.handleParseFeedUrl = this.handleParseFeedUrl.bind(this);
  }

  handleParseFeedUrl (url) {
    let _this = this;
    if (process.env.NODE_ENV === 'development') {
      url = 'http://localhost:5000/podcast?url=' + url;
    }
    console.log(url);

    Axios.get(url)
    .then(function (response) {
      console.log(response);

      // parse Podcast xml into js Object
      parsePodcast(response.data, (err, data) => {
        console.log(data);

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
            console.log(data.episodes[i]);
            _this.setState({episodes: [..._this.state.episodes,
              {
                title: data.episodes[i].title,
                url: data.episodes[i].enclosure.url,
                timeline: data.episodes[i].timeline,
                desc: data.episodes[i].description,
                pubDate: data.episodes[i].published.toLocaleDateString(),
                imageUrl: data.image,
                dur: data.episodes[i].duration
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
    console.log("Render Feed Container");
    return (

      <div className="container mainContainer">

        <div className="row">
          <Search onSearch={this.handleParseFeedUrl}/>
        </div>



      <PodcastList
      onParseFeedUrl={this.handleParseFeedUrl}/>

      {this.state.title ?
        <PodcastDetails
        title={this.state.title}
        desc={this.state.desc}
        imageUrl={this.state.imageUrl}
        episodes={this.state.episodes}
        onLoadEpisode={this.props.onLoadEpisode}/>
      :
        <div className="message">Select a Podcast or enter an RSS feed to see availible episodes!</div>
      }

      </div>
    );
  }
}

// Export AppContainer Component
export default FeedContainer
