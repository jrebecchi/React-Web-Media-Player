import React, { Component } from 'react';
import './App.css';
import WebMediaPlayer from './WebMediaPlayer/WebMediaPlayer'

class App extends Component {
  render() {


    return (
      <div className="App">

        <iframe title="fsqfdsqf" width="560" height="315" src="https://www.youtube.com/embed/aqz-KE-bpKQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


        <WebMediaPlayer
          title="Video Player"
          thumbnail="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg" 
          video="https://nusid.net/video.mp4"
          width="560"
          height="315"
        />

        <WebMediaPlayer
          title="Slideshow Player"
          link="https://google.com"
          thumbnail="https://slideshowexemple1-djlttrqvkb.now.sh/slide1.jpg" 
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
          link="https://google.com"
          thumbnail="https://slideshowexemple1-djlttrqvkb.now.sh/slide1.jpg" 
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
