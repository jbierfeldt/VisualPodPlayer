import React from 'react';
import ReactDOM from 'react-dom';
import scrollToComponent from 'react-scroll-to-component';

import {formatMilliseconds} from '../../utils/time.js';

import TranscriptCard from './transcriptCard.component.js';


const ChapterCard = (props) => (
  <div className="card card-heading text-center">
    <div className="card-header d-flex w-100 justify-content-between">
      <small>{formatMilliseconds(props.data.timestamp)}</small>
      <h5>{props.data.title}</h5>
      <span><i className="fa fa-bookmark"></i></span>
    </div>
    {props.data.image
      ? <img className="card-img-top" onLoad={props.onImageLoad} src={props.data.image.file} alt={props.data.image.caption} />
      : null
    }
    <div className="card-body">
      <p className="card-text">{props.data.summary}</p>
    </div>
  </div>
);

const QuoteCard = (props) => (
  <div className="card text-center">
    <div className="card-header d-flex w-100 justify-content-between">
      <small>{formatMilliseconds(props.data.timestamp)}</small>
      <span><i className="fa fa-quote-right"></i></span>
    </div>
    {props.data.image
      ? <img className="card-img-top" onLoad={props.onImageLoad} src={props.data.image.file} alt={props.data.image.caption} />
      : null
    }
    <div className="card-body">
      <h3 className="card-text"><i className="fa fa-quote-left"></i> {props.data.text} <i className="fa fa-quote-right"></i></h3>
      {props.data.attribution
        ? <small>{props.data.attribution}</small>
        : null
      }
    </div>
  </div>
);

const MusicCard = (props) => (
  <div className="card text-center">
  <div className="card-header d-flex w-100 justify-content-between">
    <small>{formatMilliseconds(props.data.timestamp)}</small>
    <span><i className="fa fa-music"></i></span>
  </div>
    {props.data.image
      ? <img className="card-img-top" onLoad={props.onImageLoad} src={props.data.image.file} alt={props.data.image.caption} />
      : null
    }
    <div className="card-body">
      <p className="card-text">{props.data.album} - {props.data.title}</p>
      <small>{props.data.artist}</small>
    </div>
  </div>
);

const ImageCard = (props) => (
  <div className="card text-center">
  <div className="card-header d-flex w-100 justify-content-between">
    <small>{formatMilliseconds(props.data.timestamp)}</small>
    <span><i className="fa fa-image"></i></span>
  </div>
    {props.data.image
      ? <img className="card-img-top" onLoad={props.onImageLoad} src={props.data.image.file} alt={props.data.image.caption} />
      : null
    }
    {props.data.text
      ?
        <div className="card-body">
          <p className="card-text">{props.data.text}</p>
        </div>
      : null
    }
  </div>
);

const LinkCard = (props) => (
  <div className="card text-center">
  <div className="card-header d-flex w-100 justify-content-between">
    <small>{formatMilliseconds(props.data.timestamp)}</small>
    <span><i className="fa fa-link"></i></span>
  </div>
    {props.data.image
      ? <img className="card-img-top" onLoad={props.onImageLoad} src={props.data.image.file} alt={props.data.image.caption} />
      : null
    }
    {props.data.text
      ?
        <div className="card-body">
          <p className="card-text">{props.data.text}</p>
        </div>
      : null
    }
    {props.data.link
      ?
        <div className="card-body">
          <a href={props.data.link.url} target="_blank" className="btn btn-primary">{props.data.link.text}</a>
        </div>
      : null
    }
  </div>
);

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnImageLoad = this.handleOnImageLoad.bind(this);
  }

  componentDidMount() {
    // scrollToComponent(this, {align: 'bottom', offset: 200, duration: 500});
    // ReactDOM.findDOMNode(this).scrollIntoView({block: "end", behavior: "smooth"});
    console.log(this.props);
    this.props.onUpdateScroll();
  }

  // once image loads, recall scrollToComponent to account for updated div height
  handleOnImageLoad() {
    // scrollToComponent(this, {align: 'bottom', offset: 200, duration: 500});
    // ReactDOM.findDOMNode(this).scrollIntoView({block: "end", behavior: "smooth"});
    this.props.onUpdateScroll();
  }

  componentWillUnmount() {
  }

  render(){
    switch (this.props.data.type) {
      case "chapter": return (<ChapterCard onImageLoad={this.handleOnImageLoad} data={this.props.data} />)
      case "quote": return (<QuoteCard onImageLoad={this.handleOnImageLoad} data={this.props.data} />)
      case "music": return (<MusicCard onImageLoad={this.handleOnImageLoad} data={this.props.data} />)
      case "transcript": return (<TranscriptCard position={this.props.position} timelineData={this.props.timelineData} onImageLoad={this.handleOnImageLoad} onUpdateScroll={this.props.onUpdateScroll} data={this.props.data} />)
      case "image": return (<ImageCard onImageLoad={this.handleOnImageLoad} data={this.props.data} />)
      case "link": return (<LinkCard onImageLoad={this.handleOnImageLoad} data={this.props.data} />)
      default: return null
    }
  }

}

export default Card
