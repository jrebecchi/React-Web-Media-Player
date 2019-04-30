import React from 'react';
import ReactDOM from 'react-dom';
import ReactWebMediaPlayer from '../../src/ReactWebMediaPlayer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReactWebMediaPlayer
    title="Video Player"
    thumbnail="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
    video="https://nusid.net/video.mp4"
    width="560"
    height="315"
    logo={{ img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Arte-Logo.svg/1280px-Arte-Logo.svg.png", href: "http://zrte.fr" }}
    color="rgb(222, 119, 18)"
  />, div);
  ReactDOM.unmountComponentAtNode(div);

  ReactDOM.render(<ReactWebMediaPlayer
    title="Slideshow Player"
    link="https://google.com"
    thumbnail="https://nusid.net/slide6.jpg"
    slideshow={
      [{
        src: "https://nusid.net/slide1.jpg",
        endTime: 2.0
      }, {
        src: "https://nusid.net/slide2.jpg",
        endTime: 4.0
      }, {
        src: "https://nusid.net/slide3.jpg",
        endTime: 6.0
      }, {
        src: "https://nusid.net/slide4.jpg",
        endTime: 8.0
      }, {
        src: "https://nusid.net/slide5.jpg",
        endTime: 120.0
      }]}
    logo={{ img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Arte-Logo.svg/1280px-Arte-Logo.svg.png", href: "https://google.com" }}
    buttons={[
      { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Arte-Logo.svg/1280px-Arte-Logo.svg.png", style: { width: "29px", }, callback: (e) => console.log("info clicked" + e) },
      { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Arte-Logo.svg/1280px-Arte-Logo.svg.png", style: { width: "26px", }, href: "https://google.com" }
    ]}
    color="red"
  />, div);
  ReactDOM.unmountComponentAtNode(div);

  ReactDOM.render(<ReactWebMediaPlayer
    title="Audio Slideshow Player"
    link="https://google.com"
    thumbnail="https://nusid.net/slide1.jpg"
    audio="https://nusid.net/audio.mp3"
    slideshow={
      [{
        src: "https://nusid.net/slide1.jpg",
        endTime: 2.0
      }, {
        src: "https://nusid.net/slide2.jpg",
        endTime: 4.0
      }, {
        src: "https://nusid.net/slide3.jpg",
        endTime: 6.0
      }, {
        src: "https://nusid.net/slide4.jpg",
        endTime: 8.0
      }, {
        src: "https://nusid.net/slide5.jpg",
        endTime: 1000.0
      }]}
    logo={{ img: "https://nusid.net/slide5.jpg", href: "https://google.com" }}
  />, div);
  ReactDOM.unmountComponentAtNode(div);

  ReactDOM.render(<ReactWebMediaPlayer
    title="Audio Slideshow Player"
    link="https://google.com"
    thumbnail="https://nusid.net/slide1.jpg"
    audio="https://nusid.net/audio.mp3"
    slideshow={
      [{
        src: "https://nusid.net/slide1.jpg",
        endTime: 2.0
      }, {
        src: "https://nusid.net/slide2.jpg",
        endTime: 4.0
      }, {
        src: "https://nusid.net/slide3.jpg",
        endTime: 6.0
      }, {
        src: "https://nusid.net/slide4.jpg",
        endTime: 8.0
      }, {
        src: "https://nusid.net/slide5.jpg",
        endTime: 120.0
      }]}
    logo={{ img: "https://nusid.net/slide5.jpg", href: "https://google.com" }}
  />, div);
  ReactDOM.unmountComponentAtNode(div);

  ReactDOM.render(<ReactWebMediaPlayer
    width="400"
    height="400"
    title="Major Lazer - Thunder & Lightning"
    link="https://google.com"
    thumbnail="https://1.bp.blogspot.com/-_YpihVbzDdI/WJh6cts82ZI/AAAAAAAAAUY/JscaeB6qRlEPW0DTnoRIspFiqAlU2T9lACLcB/s1600/Peace%2BIs%2BThe%2BMission%2B%2528Extended%2529%2B-%2B2015%2B.jpg"
    vinyl={{
      img: "https://1.bp.blogspot.com/-_YpihVbzDdI/WJh6cts82ZI/AAAAAAAAAUY/JscaeB6qRlEPW0DTnoRIspFiqAlU2T9lACLcB/s1600/Peace%2BIs%2BThe%2BMission%2B%2528Extended%2529%2B-%2B2015%2B.jpg",
      rpm: 33
    }}
    audio="https://nusid.net/audio.mp3"
  />, div);
  ReactDOM.unmountComponentAtNode(div);

  ReactDOM.render(<ReactWebMediaPlayer
    width="400"
    height="400"
    title="Major Lazer - Thunder & Lightning"
    link="https://google.com"
    thumbnail="https://1.bp.blogspot.com/-_YpihVbzDdI/WJh6cts82ZI/AAAAAAAAAUY/JscaeB6qRlEPW0DTnoRIspFiqAlU2T9lACLcB/s1600/Peace%2BIs%2BThe%2BMission%2B%2528Extended%2529%2B-%2B2015%2B.jpg"
    audio="https://nusid.net/audio.mp3"
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
