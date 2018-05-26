import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import scrollToComponent from 'react-scroll-to-component';


class CardStack extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnUpdateScroll = this.handleOnUpdateScroll.bind(this);
  }

  handleOnUpdateScroll() {
    console.log(this);
    scrollToComponent(this, {align: 'bottom', offset: 200, duration: 500});
    // ReactDOM.findDOMNode(this).scrollIntoView({block: "end", behavior: "smooth"});
  }

  render(){

    const newCards = this.props.cards.map((element, index) =>
      React.cloneElement(element, {onUpdateScroll: this.handleOnUpdateScroll})
    );

    console.log(this.props);

    return(
      <div className="col-8 cardstack card-container">

      <ReactCSSTransitionGroup
        transitionName="card"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>

        {newCards}
      </ReactCSSTransitionGroup>
      </div>
    )
  }

}

export default CardStack
