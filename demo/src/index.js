import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactWebMediaPlayer from '../../src/ReactWebMediaPlayer';
import heart from './heart.svg';

class Demo extends Component {

  state = {
    video: {
      reinitTimes: 0,
      video: "https://nusid.net/video.mp4",
      title: 'Video player - reinit 0',
      autoplay: false
    },
    audio: {
      reinitTimes: 0,
      audio: "https://nusid.net/audio.mp3",
      title: 'Audio player - reinit 0',
      autoplay: false
    },
    vinyl: {
      reinitTimes: 0,
      audio: "https://nusid.net/audio.mp3",
      title: 'Vinyl Player - reinit 0',
      autoplay: false,
      vinyl: { img: "https://nusid.net/album-cover.jpg", rpm: 10 }
    },
    slideshow: {
      reinitTimes: 0,
      slideshow: [{
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
      }],
      title: 'My Slideshow Player - reinit 0',
      autoplay: false
    },
    audioslideshow: {
      reinitTimes: 0,
      slideshow: [{
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
      }],
      title: 'My Slideshow Player with Soundtrack - reinit 0',
      audio: "audio.mp3",
      autoplay: false
    },
  }

  handleUpdateVideoState = () => {
    const reinitTimes = ++this.state.video.reinitTimes;
    this.setState({
      ...this.state,
      video: {
        reinitTimes: reinitTimes,
        video: "https://nusid.net/video.mp4",
        title: 'Video player - reinit '+reinitTimes,
        autoplay: reinitTimes === 2
      }
    });

  };

  handleUpdateaudioState = () => {
    const reinitTimes = ++this.state.audio.reinitTimes;
    this.setState({
      ...this.state,
      audio: {
        reinitTimes: reinitTimes,
        audio: "https://nusid.net/audio.mp3",
        title: 'Audio player - reinit '+reinitTimes,
        autoplay: reinitTimes === 2
      }
    });

  };

  handleUpdatevinylState = () => {
    const reinitTimes = ++this.state.vinyl.reinitTimes;
    this.setState({
      ...this.state,
      vinyl: {
        reinitTimes: reinitTimes,
        audio: "https://nusid.net/audio.mp3",
        title: 'Vinyl Player - reinit '+reinitTimes,
        autoplay: reinitTimes === 2,
        vinyl: { img: "https://nusid.net/slide6.jpg", rpm: 15 }
      }
    });
  };

  handleUpdateSlideshowState = () => {
    const reinitTimes = ++this.state.slideshow.reinitTimes;
    this.setState({
      ...this.state,
      slideshow: {
        reinitTimes: reinitTimes,
        slideshow: [{
          img: "https://nusid.net/slide6.jpg",
          endTime: 10.0
        }, {
          img: "https://nusid.net/slide7.jpg",
          endTime: 20.0
        }],
        title: 'My Slideshow Player - reinit '+reinitTimes,
        autoplay: reinitTimes === 2
      }
    });
  };
  handleUpdateAudioSlideshowState = () => {
    const reinitTimes = ++this.state.audioslideshow.reinitTimes;
    this.setState({
      ...this.state,
      audioslideshow: {
        reinitTimes: reinitTimes,
        slideshow: [{
          img: "https://nusid.net/slide6.jpg",
          endTime: 10.0
        }, {
          img: "https://nusid.net/slide7.jpg",
          endTime: 20.0
        }],
        title: 'My Slideshow Player with Soundtrack - reinit '+reinitTimes,
        audio: "audio.mp3",
        autoplay: reinitTimes === 2
      }
    });
  };

  render() {
    return <div style={{ textAlign: "" }}>

      <ReactWebMediaPlayer
        title={this.state.video.title}
        titleHref="http://google.com"
        thumbnail="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
        video={this.state.video.video}
        id="video"
        autoplay={this.state.video.autoplay}
        isTestEnvironment={true}
      />
      <button onClick={() => this.handleUpdateVideoState()}>Change video props</button>

      <ReactWebMediaPlayer
        width={560}
        height={560}
        title={this.state.audio.title}
        titleHref="https://google.com"
        thumbnail={"https://nusid.net/album-cover.jpg"}
        audio={this.state.audio.audio}
        logo={{ img: "https://nusid.net/your-logo.png", href: "https://www.npmjs.com/package/react-web-media-player" }}
        volume={0.5}
        id="audio"
        isTestEnvironment={true}
        autoplay={this.state.audio.autoplay}
      />
      <button onClick={() => this.handleUpdateaudioState()}>Change audio props</button>

      <ReactWebMediaPlayer
        width={560}
        height={560}
        title={this.state.vinyl.title}
        titleHref="https://google.com"
        thumbnail={"https://nusid.net/album-cover.jpg"}
        vinyl={this.state.vinyl.vinyl}
        audio={this.state.vinyl.audio}
        logo={{ img: "https://nusid.net/your-logo.png", href: "https://www.npmjs.com/package/react-web-media-player" }}
        volume={0.5}
        id="vinyl"
        isTestEnvironment={true}
        autoplay={this.state.vinyl.autoplay}
      />
      <button onClick={() => this.handleUpdatevinylState()}>Change vinyl props</button>

      <ReactWebMediaPlayer
        title={this.state.slideshow.title}
        titleHref="https://google.com"
        thumbnail="https://nusid.net/slide1.jpg"
        slideshow={this.state.slideshow.slideshow}
        logo={{ img: "https://nusid.net/your-logo.png", href: "https://www.npmjs.com/package/react-web-media-player" }}
        volume={0.5}
        id="slideshow"
        isTestEnvironment={true}
        autoplay={this.state.slideshow.autoplay}
      />
      <button onClick={() => this.handleUpdateSlideshowState()}>Change slideshow props</button>

      <ReactWebMediaPlayer
        title={this.state.audioslideshow.title}
        titleHref="https://google.com"
        thumbnail="https://nusid.net/slide1.jpg"
        audio="https://nusid.net/audio.mp3"
        slideshow={this.state.audioslideshow.slideshow}
        logo={{ img: "https://nusid.net/your-logo.png", href: "https://www.npmjs.com/package/react-web-media-player" }}
        volume={0.5}
        id="audioslideshow"
        isTestEnvironment={true}
        autoplay={this.state.audioslideshow.autoplay}
      />
      <button onClick={() => this.handleUpdateAudioSlideshowState()}>Change audioslideshow props</button>
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'));