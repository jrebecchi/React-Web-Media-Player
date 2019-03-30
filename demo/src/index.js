import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactWebMediaPlayer from '../../src/ReactWebMediaPlayer';

class Demo extends Component {
  render() {
    return <div style={{textAlign:"center"}}>
      <ReactWebMediaPlayer
        title="Big Buck Bunny - 2008"
        thumbnail="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
        video="https://nusid.net/video.mp4"
        logo={{ img: "https://nusid.net/your-logo.png", src:"https://www.npmjs.com/package/react-web-media-player"}}
      />
      <ReactWebMediaPlayer
        width="400"
        height="400"
        title="Key Notez - Summer"
        link="https://google.com"
        thumbnail={"https://nusid.net/album-cover.jpg"}
        vinyl={{
          img: "https://nusid.net/album-cover.jpg",
          rpm: 10
        }}
        audio="https://nusid.net/audio.mp3"
        logo={{ img: "https://nusid.net/your-logo.png", src:"https://www.npmjs.com/package/react-web-media-player"}}
      />
      <ReactWebMediaPlayer
        width="400"
        height="400"
        title="Key Notez - Summer"
        link="https://google.com"
        thumbnail={"https://nusid.net/album-cover.jpg"}
        audio="https://nusid.net/audio.mp3"
        logo={{ img: "https://nusid.net/your-logo.png", src:"https://www.npmjs.com/package/react-web-media-player"}}
      />

      <ReactWebMediaPlayer
        title="My Slideshow Player"
        link="https://google.com"
        thumbnail="https://nusid.net/slide1.jpg"
        slideshow={
          [{
            src: "https://nusid.net/slide1.jpg",
            endTime: 4.0
          }, {
            src: "https://nusid.net/slide2.jpg",
            endTime: 8.0
          }, {
            src: "https://nusid.net/slide3.jpg",
            endTime: 12.0
          }, {
            src: "https://nusid.net/slide4.jpg",
            endTime: 16.0
          }, {
            src: "https://nusid.net/slide5.jpg",
            endTime: 20.0
          }, {
            src: "https://nusid.net/slide6.jpg",
            endTime: 24.0
          }, {
            src: "https://nusid.net/slide7.jpg",
            endTime: 28.0
          }]}
          logo={{ img: "https://nusid.net/your-logo.png", src:"https://www.npmjs.com/package/react-web-media-player"}}
      />

      <ReactWebMediaPlayer
        title="My Slideshow Player with Soundtrack"
        link="https://google.com"
        thumbnail="https://nusid.net/slide1.jpg"
        audio="https://nusid.net/audio.mp3"
        slideshow={
          [{
            src: "https://nusid.net/slide1.jpg",
            endTime: 4.0
          }, {
            src: "https://nusid.net/slide2.jpg",
            endTime: 8.0
          }, {
            src: "https://nusid.net/slide345.jpg",
            endTime: 12.0
          }, {
            src: "https://nusid.net/slide4.jpg",
            endTime: 16.0
          }, {
            src: "https://nusid.net/slide5.jpg",
            endTime: 20.0
          }, {
            src: "https://nusid.net/slide6.jpg",
            endTime: 24.0
          }, {
            src: "https://nusid.net/slide7.jpg",
            endTime: 28.0
          }]}
        logo={{ img: "https://nusid.net/your-logo.png", src:"https://www.npmjs.com/package/react-web-media-player"}}
      />

    </div>
  }
}

render(<Demo />, document.querySelector('#demo'));