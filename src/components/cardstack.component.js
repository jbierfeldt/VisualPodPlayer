import React from 'react';
import ReactDOM from 'react-dom';
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

    return(
      <div className="card-stack-container">
        {newCards}
      </div>
    )
  }

}

export default CardStack
