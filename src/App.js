import React, { Component } from 'react';
import './App.css';
import WebMediaPlayer from './WebMediaPlayer/WebMediaPlayer'
import bande from './img/bande.png';
import logo from './img/logo.svg';
import info from './img/info.svg';
import heart from './img/heart.svg';

/*
Bugs:
- //Si play -> Loaf -> while loading -> pause -> when video ready -> will play
- //Clicking on the next button of a slideshow when it is is already over, make the duration be NaN
- //Régler problème de CSS sur IE
- //Quand on passe la souris sur l'icone sound empêche la fermeture du menu en quittant le player
- //Player en mode replay quand video time length not loaded
- //Si ca charge et que je reviens en arrière la ou s'est chargé et que ca lit ca garde le chargement
- //Loading animation not working on IE
- //Video et audio ne se lancent pas
- //Audio & video not working on IE
- //Appeler this.video.load sur IE pour tenter de relire la video
- //Slideshow can't replay on Chrome previous button when isreading terminated should change the replay arow

Dev:
- lire de l'audio sans vinyle qui tourne
- play/pause au click sur le container
- cacher souris après 3 secondes
- Slideshow plus long que l'audio
- adapter menu icon size au fullscreen
- //Player audio en mode vinyle

- Permettre d'avoir différentes sources
- récupérer le niveau de scroll à la sortie du fullscreen pour le réappliquer
- différente forme de bulle de play pour l'init : carré, ovale rond...
- avoir une preview quand on passe sur la progress bar avec le scrubber button
- allowfullscreen option
- init function where we say when to actually init the player
- autoplay option

- 100% test cover
- Packager le composant en package npm (ce qui sera publié sur github)
- faire un readme
- avoir un serveur de démo
- Option pour réduire le volume à la fin et au début pour audio slideshow


Refactorings:
- //moving the reducer include in WebMediaPlayer.js in a separate file

- changer option entime en duration pour slideshow
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
          audio="https://nusid.net/audio.mp3"
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
        />
        <WebMediaPlayer
          width="400"
          height="400"
          title="Major Lazer - Thunder & Lightning"
          link="https://google.com"
          thumbnail="https://1.bp.blogspot.com/-_YpihVbzDdI/WJh6cts82ZI/AAAAAAAAAUY/JscaeB6qRlEPW0DTnoRIspFiqAlU2T9lACLcB/s1600/Peace%2BIs%2BThe%2BMission%2B%2528Extended%2529%2B-%2B2015%2B.jpg"
          vinyl={{
            img:"https://1.bp.blogspot.com/-_YpihVbzDdI/WJh6cts82ZI/AAAAAAAAAUY/JscaeB6qRlEPW0DTnoRIspFiqAlU2T9lACLcB/s1600/Peace%2BIs%2BThe%2BMission%2B%2528Extended%2529%2B-%2B2015%2B.jpg", 
            rpm: 33
          }}
          audio="https://nusid.net/audio.mp3"
        />
      </div>
    );
  }
}

export default App;