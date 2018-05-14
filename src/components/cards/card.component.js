import React from 'react';

import ClassNames from 'classnames';

import {formatMilliseconds} from '../../utils/time.js';

import scrollToComponent from 'react-scroll-to-component';

const ChapterCard = (props) => (
  <div className="card card-heading text-center">
    <div class="card-header d-flex w-100 justify-content-between">
      <small>{formatMilliseconds(props.data.timestamp)}</small>
      <h5>{props.data.title}</h5>
    </div>
    {props.data.image
      ? <img className="card-img-top" src={props.data.image.file} alt={props.data.image.caption} />
      : null
    }
    <div class="card-body">
      <p class="card-text">{props.data.summary}</p>
    </div>
  </div>
);

const QuoteCard = (props) => (
  <div className="card text-center">
    <div class="card-header d-flex w-100 justify-content-between">
      <small>{formatMilliseconds(props.data.timestamp)}</small>
      <span><i class="fa fa-quote-right"></i></span>
    </div>
    {props.data.image
      ? <img className="card-img-top" src={props.data.image.file} alt={props.data.image.caption} />
      : null
    }
    <div class="card-body">
      <h3 class="card-text"><i class="fa fa-quote-left"></i> {props.data.text} <i class="fa fa-quote-right"></i></h3>
      {props.data.attribution
        ? <small>{props.data.attribution}</small>
        : null
      }
    </div>
  </div>
);

const MusicCard = (props) => (
  <div className="card text-center">
  <div class="card-header d-flex w-100 justify-content-between">
    <small>{formatMilliseconds(props.data.timestamp)}</small>
    <span><i class="fa fa-music"></i></span>
  </div>
    {props.data.image
      ? <img className="card-img-top" src={props.data.image.file} alt={props.data.image.caption} />
      : null
    }
    <div class="card-body">
      <p class="card-text">{props.data.album} - {props.data.title}</p>
      <small>{props.data.artist}</small>
    </div>
  </div>
);

const TranscriptCard = (props) => (
  <div className="card text-center">
  <div class="card-header d-flex w-100 justify-content-between">
    <small>{formatMilliseconds(props.data.timestamp)}</small>
    <span><i class="fa fa-comment"></i></span>
  </div>
    {props.data.image
      ? <img className="card-img-top" src={props.data.image.file} alt={props.data.image.caption} />
      : null
    }
    <div class="card-body">
      <p class="card-text">{props.data.text}</p>
      <footer class="blockquote-footer">{props.timelineData.speakers[props.data.speaker].name}</footer>
    </div>
  </div>
);

const ImageCard = (props) => (
  <div className="card text-center">
  <div class="card-header d-flex w-100 justify-content-between">
    <small>{formatMilliseconds(props.data.timestamp)}</small>
    <span><i class="fa fa-image"></i></span>
  </div>
    {props.data.image
      ? <img className="card-img-top" src={props.data.image.file} alt={props.data.image.caption} />
      : null
    }
    {props.data.text
      ?
        <div class="card-body">
          <p class="card-text">{props.data.text}</p>
        </div>
      : null
    }
  </div>
);

const LinkCard = (props) => (
  <div className="card text-center">
  <div class="card-header d-flex w-100 justify-content-between">
    <small>{formatMilliseconds(props.data.timestamp)}</small>
    <span><i class="fa fa-link"></i></span>
  </div>
    {props.data.image
      ? <img className="card-img-top" src={props.data.image.file} alt={props.data.image.caption} />
      : null
    }
    {props.data.text
      ?
        <div class="card-body">
          <p class="card-text">{props.data.text}</p>
        </div>
      : null
    }
    {props.data.link
      ?
        <div class="card-body">
          <a href={props.data.link.url} target="_blank" className="btn btn-primary">{props.data.link.text}</a>
        </div>
      : null
    }
  </div>
);

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    console.log("mounted", this);

    scrollToComponent(this, {align: 'top'});

  }

  componentWillUnmount() {
  }

  render(){
    switch (this.props.data.type) {
      case "chapter": return (<ChapterCard data={this.props.data} />)
      case "quote": return (<QuoteCard data={this.props.data} />)
      case "music": return (<MusicCard data={this.props.data} />)
      case "transcript": return (<TranscriptCard timelineData={this.props.timelineData} data={this.props.data} />)
      case "image": return (<ImageCard data={this.props.data} />)
      case "link": return (<LinkCard data={this.props.data} />)
      default: return null
    }
  }

}

export default Card
