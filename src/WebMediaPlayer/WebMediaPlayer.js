import React, { Component } from 'react';
import './WebMediaPlayer.css';

class WebMediaPlayer extends Component {
  render() {
    console.log(this.props);
    return (
      <iframe width="560" height="315" title="{this.props.name}">
 
      </iframe>
    );
  }
}

export default WebMediaPlayer;
