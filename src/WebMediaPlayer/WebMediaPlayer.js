import React, { Component } from 'react';
import './WebMediaPlayer.css';

const DEFAULT_WIDTH = 560 //560;
const DEFAULT_HEIGHT = 315 //315;
const DEFAULT_ALLOW_FULL_FRAME = true;
const DEFAULT_VOLUME = 1.0;

class WebMediaPlayer extends Component {

  constructor(options) {
    super(options);
    if (options === undefined){
      throw new Error("No options given to the player !");
    }
    this.state = {};

    if (options.hasOwnProperty("video")){
      if (options.hasOwnProperty("audio")){
        throw new Error("Combination impossible");
      } else if (options.hasOwnProperty("imageSequence")){
        throw new Error("Combination impossible");
      }  else {
        this.state = this.initVideoPlayerState(options);
      }
    } else if (options.hasOwnProperty("slideshow")){
      if (options.hasOwnProperty("audio")){
        this.state = this.initAudioSlideshowPlayerState(options);
      } else if (options.hasOwnProperty("video")){
        throw new Error("Combination impossible");
      }  else {
        this.state = this.initSlideshowPlayerState(options);
      }
    } else {
      throw new Error("Combination impossible");
    }

    this.state.thumbnail= options.thumbnail;
    
    if (options.hasOwnProperty("height")){
        this.state.height = options.height;
    } else {
        this.state.height = DEFAULT_HEIGHT;
    }
    if (options.hasOwnProperty("width")){
      this.state.width = options.width;
    } else {
        this.state.width = DEFAULT_WIDTH;
    }
    if (options.hasOwnProperty("volume")){
        this.state.volume = options.volume;
    } else {
        this.state.volume = DEFAULT_VOLUME;
    }
    if (options.hasOwnProperty("allowFullFrame")){
        this.state.allowFullFrame = options.allowFullFrame;
    } else {
        this.state.allowFullFrame = DEFAULT_ALLOW_FULL_FRAME;
    }
    console.log(this.state);
  };

  initSlideshowPlayerState(options){
    let state = {};
    state.hasAudio = false;
    state.hasSlideshow = true;
    state.hasVideo = false;
    if(options.slideshow.slice(-1)[0].endTime === undefined){
      throw new Error("No time specified for slideshow");
    }
    state.timeLength = options.slideshow.slice(-1)[0].endTime;
    state.slideshow = options.slideshow;
    return state;
  }

  initAudioSlideshowPlayerState(options){
    let state = {};
    state.hasAudio = true;
    state.hasSlideshow = true;
    state.hasVideo = false;
    if(options.slideshow.slice(-1)[0].endTime === undefined){
      throw new Error("No time specified for slideshow");
    }
    state.timeLength = options.slideshow.slice(-1)[0].endTime;
    state.slideshow = options.slideshow;
    state.audio = options.audio;
    return state;
  }

  initVideoPlayerState(options){
    let state = {};
    state.hasVideo = true;
    state.hasAudio = false;
    state.hasSlideshow = false;
    state.video = options.video;
    return state;
  }

  render() {
    return (
      <iframe width="560" height="315" title="{this.props.name}">
 
      </iframe>
    );
  }
}

export default WebMediaPlayer;
