// React library
import React from 'react';

import Rnd from 'react-rnd';

import FeedContainer from '../containers/feed.container';

class SlideOut extends React.Component {
  // PlayerContainer constructor
  constructor(props) {
    super(props);

    this.state = {
      width: 400,
      previousWidth: 400,
      visible: true
    }
  }

  handleToggle() {
    console.log('tog');
    this.setState((prevState) => {
      const newVisible = !prevState.visible;
      const newWidth = prevState.visible ? 0 : prevState.previousWidth;
      const newPreviousWidth = prevState.visible ? prevState.width : 0;
      return {
        visible: newVisible,
        width: newWidth,
        previousWidth: newPreviousWidth
      }
    });
  }

  handleHide() {
    this.setState((prevState) => (
      {
        width:0,
        previousWidth: prevState.width,
        visible: false
      }
    ));
  }

  handleShow() {
    this.setState((prevState) => (
      {
        width: prevState.previousWidth,
        visible: true
      }
    ));
  }

  handleOnMouseOver() {
    console.log("onMouseOver");
  }

  // Render method
  render () {
    console.log(this.state);
    const displaySetting = this.state.visible
      ? 'inherit'
      : 'none';

    return (
      <div style={{height: '100vh'}}>
      <Rnd
        style= {{position: 'relative', display: displaySetting}}
        size={{ width: this.state.width }}
        minWidth={100}
        maxWidth={600}
        minHeight={'100%'}
        onResizeStart={(e, d, r) => {
          this.setState((prevState) => {
            return {previousWidth: prevState.width}
          });
        }}
        enableResizing={{top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
        disableDragging={true}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.offsetWidth
          });
        }}
      >
        <FeedContainer
          onLoadEpisode={this.props.onLoadEpisode}
          onTogglePlay={this.props.onTogglePlay}
          onForward={this.props.onForward}
          onBackward={this.props.onBackward}
        />
      </Rnd>
      <div onMouseOver={this.handleOnMouseOver} onClick={this.handleToggle.bind(this)} id="slide-handle">
        <div className="toggle-button" style={{width: 25, height: 50, position: 'absolute', left: '100%', top: '50%', zIndex: 1020}}>
          <div className="toggle-button-inner" style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            position: 'absolute',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: 'lightblue',
            transform: 'translateX(-20px)'

          }}>
            {this.state.visible
              ? <i class="fa fa-chevron-left"></i>
              : <i class="fa fa-chevron-right"></i>
            }
          </div>
        </div>
      </div>
      </div>

    );
  }
}

// Export AppContainer Component
export default SlideOut
