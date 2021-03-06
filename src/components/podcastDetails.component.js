import React from 'react';

class PodcastDetails extends React.Component {
  render(){

    const episodesRows = [];
    for (let i = 0; i < this.props.episodes.length; i++) {
      episodesRows.push(

        <a key={i} style={{cursor: 'pointer'}} className="list-group-item list-group-item-action flex-column align-items-start"
        onClick={() => this.props.onLoadEpisode({
        title: this.props.episodes[i].title,
        url: this.props.episodes[i].url,
        timelineUrl: this.props.episodes[i].timeline,
        image: this.props.episodes[i].imageUrl,
        dur: this.props.episodes[i].dur
        })}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{this.props.episodes[i].title}</h5>
            <small>{this.props.episodes[i].pubDate}</small>
          </div>
          <p className="mb-1">{this.props.episodes[i].desc}</p>
        </a>

      )
    }

    return(
      <div className="row">
      <div className="col-3">
        <img src={this.props.imageUrl} alt="" style={{width:'100%'}}/>
      </div>
      <div className="col-9">
        <p>{this.props.desc}</p>
      </div>
      <h3>Episodes:</h3>
      <div className="list-group">
        {episodesRows}
      </div>
      </div>
    )
  }

}

export default PodcastDetails
