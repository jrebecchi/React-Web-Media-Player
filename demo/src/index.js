import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactWebMediaPlayer from '../../src/ReactWebMediaPlayer';
import heart from './heart.svg';

class Demo extends Component {
  render() {
    return <div style={{textAlign:""}}>
       {/*
      <ReactWebMediaPlayer
        title="Big Buck Bunny - 2008"
        titleHref="http://google.com"
        thumbnail="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
        video="https://nusid.net/video.mp4"
        autoplay={true}
      />
       
      
      <ReactWebMediaPlayer
        width={400}
        height={400}
        title="Key Notez - Summer"
        titleHref="https://google.com"
        thumbnail={"https://nusid.net/album-cover.jpg"}
        vinyl={{ img: "https://nusid.net/album-cover.jpg", rpm: 10}}
        audio="https://nusid.net/audio.mp3"
        logo={{ img: "https://nusid.net/your-logo.png", href:"https://www.npmjs.com/package/react-web-media-player"}}
        autoplay={true}
      />
      
      <ReactWebMediaPlayer
        width={400}
        height={400}
        title="Key Notez - Summer"
        titleHref="https://google.com"
        thumbnail={"https://nusid.net/album-cover.jpg"}
        audio="https://nusid.net/audio.mp3"
        logo={{ img: "https://nusid.net/your-logo.png", href:"https://www.npmjs.com/package/react-web-media-player"}}
        autoplay={true}
      />
       
      <ReactWebMediaPlayer
        title="My Slideshow Player"
        titleHref="https://google.com"
        thumbnail="https://nusid.net/slide1.jpg"
        slideshow={
          [{
            img: "https://nusid.net/slide1.jpg",
            endTime: 4.0
          }, {
            img: "https://nusid.net/slide2.jpg",
            endTime: 8.0
          }, {
            img: "https://nusid.net/slide3.jpg",
            endTime: 12.0
          }, {
            img: "https://nusid.net/slide4.jpg",
            endTime: 16.0
          }, {
            img: "https://nusid.net/slide5.jpg",
            endTime: 20.0
          }, {
            img: "https://nusid.net/slide6.jpg",
            endTime: 24.0
          }, {
            img: "https://nusid.net/slide7.jpg",
            endTime: 28.0
          }]}
          logo={{ img: "https://nusid.net/your-logo.png", href:"https://www.npmjs.com/package/react-web-media-player"}}
          autoplay={true}
      />*/}
      
      <ReactWebMediaPlayer
        title="My Slideshow Player with Soundtrack"
        titleHref="https://google.com"
        thumbnail="https://nusid.net/slide1.jpg"
        audio="https://nusid.net/audio.mp3"
        slideshow={
          [{
            img: "https://nusid.net/slide1.jpg",
            endTime: 4.0
          }, {
            img: "https://nusid.net/slide2.jpg",
            endTime: 8.0
          }, {
            img: "https://nusid.net/slide3.jpg",
            endTime: 12.0
          }, {
            img: "https://nusid.net/slide4.jpg",
            endTime: 16.0
          }, {
            img: "https://nusid.net/slide5.jpg",
            endTime: 20.0
          }, {
            img: "https://nusid.net/slide6.jpg",
            endTime: 24.0
          }, {
            img: "https://nusid.net/slide7.jpg",
            endTime: 600.0
          }]}
        logo={{ img: "https://nusid.net/your-logo.png", href:"https://www.npmjs.com/package/react-web-media-player"}}
        autoplay={true}
        />{/**/}

    </div>
  }
}

render(<Demo />, document.querySelector('#demo'));