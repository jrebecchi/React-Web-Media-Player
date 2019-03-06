import React, { Component } from 'react';
import './App.css';
import WebMediaPlayer from './WebMediaPlayer/WebMediaPlayer'
import bande from './img/bande.png';
import logo from './img/logo.svg';
import info from './img/info.svg';
import heart from './img/heart.svg';

/*
Si j'ai mis pause et que c'est pret ca va lire
Si ca charge et que je reviens en arrière la ou s'est chargé et que ca lit ca garde le chargement
Initialiser Audio slideshow et déplacer directement le scrubber button 2 seconde avant la fin bug
Option pour réduire le volume à la fin et au début
*/


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
          logo={{ img: "https://slideshowexemple1-djlttrqvkb.now.sh/slide1.jpg" }}
          color="rgb(108, 233, 6)"
        />

        <WebMediaPlayer
          title="Slideshow Player"
          link="https://google.com"
          thumbnail="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
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
              src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide455.jpg",
              endTime: 8.0
            }, {
              src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide5.jpg",
              endTime: 120.0//durantion is better
            }]}
          logo={{ img: logo, href: "https://google.com" }}
          buttons={[
            { img: info, style: { width: "29px", }, callback: (e) => console.log("info clicked" + e) },
            { img: heart, style: { width: "26px", }, href: "https://google.com" }
          ]}
          color="red"
        />

        <WebMediaPlayer
          title="Audio Slideshow Player"
          link="https://google.com"
          thumbnail="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
          audio="https://nusid.net/audio.flac"
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
              src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide455.jpg",
              endTime: 8.0
            }, {
              src: "https://slideshowexemple1-djlttrqvkb.now.sh/slide5.jpg",
              endTime: 120.0
            }]}
          logo={{ img: bande, href: "https://google.com" }}
          logoLink="https://google.com"
        />
      </div>
    );
  }
}

export default App;
