import React, { Component } from 'react';
import './App.css';
import WebMediaPlayer from './WebMediaPlayer/WebMediaPlayer'

class App extends Component {
  render() {


    return (
      <div className="App">

        <WebMediaPlayer
          title="Video Player"
          thumbnail="img/bbb.jpg" 
          video="https://nusid.net/video.mp4"
          width="560"
          height="315"
        />

        <WebMediaPlayer
          title="Slideshow Player"
          thumbnail="https://i.ytimg.com/vi_webp/qIM0kucdiGM/sddefault.webp" 
          slideshow={
          [{
            src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide1.jpg",
            endTime: 2.0
          }, {
            src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide2.jpg",
            endTime: 4.0
          }, {
            src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide3.jpg",
            endTime: 6.0
          }, {
            src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide4.jpg",
            endTime: 8.0
          }, {
            src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide5.jpg",
            endTime: 120.0
          }]}
        />
        
        <WebMediaPlayer
          title="Audio Slideshow Player"
          thumbnail="https://i.ytimg.com/vi_webp/qIM0kucdiGM/sddefault.webp" 
          audio="https://nusid.net/audio.flac" 
          slideshow={
          [{
            src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide1.jpg",
            endTime: 2.0
          },{
            src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide2.jpg",
            endTime: 4.0
          },{
            src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide3.jpg",
            endTime: 6.0
          },{
            src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide4.jpg",
            endTime: 8.0
          },{
            src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide5.jpg",
            endTime: 120.0
          }]}
        />
      </div>
    );
  }
}

export default App;
