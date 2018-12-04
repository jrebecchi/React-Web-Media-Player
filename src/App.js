import React, { Component } from 'react';
import './App.css';
import WebMediaPlayer from './WebMediaPlayer/WebMediaPlayer'

class App extends Component {
  render() {
    /*const imageSequence = [
      {
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
      }];
      const imasequenceJSON  = JSON.stringify(imageSequence);*/

    const imasequence = "Hello biatch!";

    return (
      <div className="App">
        
        <header className="App-header">
          <h1>React-WebMediaPlayer</h1>
        </header>
        <WebMediaPlayer thumbnail="img/bbb.jpg" video="https://nusid.net/video.mp4"/>
        <WebMediaPlayer thumbnail="https://i.ytimg.com/vi_webp/qIM0kucdiGM/sddefault.webp" imageSequence="{imasequence}"/>
        <WebMediaPlayer thumbnail="https://i.ytimg.com/vi_webp/qIM0kucdiGM/sddefault.webp" audio="https://nusid.net/audio.flac" imageSequence="{ imasequence }"/>
      </div>
    );
  }
}

export default App;
