[![Build Status](https://travis-ci.org/JohannC/React-Web-Media-Player.svg?branch=master)](https://travis-ci.org/JohannC/React-Web-Media-Player)
[![Coverage Status](https://coveralls.io/repos/github/JohannC/React-Web-Media-Player/badge.svg?branch=master)](https://coveralls.io/github/JohannC/React-Web-Media-Player?branch=master)
[![Package Quality](https://npm.packagequality.com/badge/react-web-media-player.png)](https://packagequality.com/#?package=react-web-media-player)

[![React Web Media Player Logo](https://nusid.net/banner-title-medium.jpg)](#)

A React Player that can play videos, audio tracks, slideshows, with an easily customizable design.

Please find the demo [here](https://react-web-media-player.herokuapp.com/) and the full API documentation [here](https://react-web-media-player.herokuapp.com/docs).

## Installation

```bash
npm install react-web-media-player --save
# or
yarn add react-web-media-player
```
```javascript
import React, { Component } from 'react';
import ReactWebMediaPlayer from 'react-web-media-player';

class App extends Component {
  render() {
    return <ReactWebMediaPlayer
        title="My own video player"
        video="https://any-link.com/my-video.mp4" 
        thumbnail="https://any-link.com/video-thumbnail.jpg"
    />
  }
}
```

## Video

To play a video pass the following options:

<p align="center">
  <img src="https://nusid.net/video.gif">
</p>

```javascript
<ReactWebMediaPlayer
  title="My own video player"
  video="https://any-link.com/my-video.mp4" 
  thumbnail="https://any-link.com/video-thumbnail.jpg"
/>
```
**Note:** not all the video formats are supported by each browser

## Audio

To play an audio track, pass the following options:

<p align="center">
  <img src="https://nusid.net/audio.gif">
</p>

```javascript
<ReactWebMediaPlayer
  title="My own audio player"
  audio="https://any-link.com/my-music.mp3" 
  thumbnail="https://any-link.com/audio-thumbnail.jpg"
/>
```
You can choose a vinyl display, by adding the `vinyl` property with the number of rounds per minut `rpm` and the image `img` to display:

<p align="center">
  <img src="https://nusid.net/vinyl.gif">
</p>

```javascript
<ReactWebMediaPlayer
  title="My own vinyl player"
  audio="https://any-link.com/my-music.mp3" 
  thumbnail="https://any-link.com/audio-thumbnail.jpg"
  vinyl={{img: "https://any-link.com/vinyl.jpg", rpm: 33 }}
/>
```

**Note:** not all the audio formats are supported by each browser

## Slideshow

To play a slideshow, pass the following options:

<p align="center">
  <img src="https://nusid.net/slideshow.gif">
</p>

```javascript
<ReactWebMediaPlayer
  title="My own slideshow player"
  thumbnail="https://any-link.com/slideshow-thumbnail.jpg"
  slideshow={[
    { src: "https://any-link.com/slide1.jpg", endTime: 4.0 },
    { src: "https://any-link.com/slide2.jpg", endTime: 8.0 },
    { src: "https://any-link.com/slide3.jpg", endTime: 12.0 },
    { src: "https://any-link.com/slide4.jpg", endTime: 16.0 }
  ]}
  logo={{ 
    img: "https://any-link.com/your-logo.png", 
    href: "https:/redirection-link.com" 
  }}
/>

```

You can add an audio track, that will be synchronized with the slideshow by adding the `audio` option :

```javascript
<ReactWebMediaPlayer
  title="My own audio-slideshow player"
  audio="https://any-link.com/my-music-to-synchronize.mp3" 
  thumbnail="https://any-link.com/slideshow-thumbnail.jpg"
  slideshow=...
/>
```

**Note:** the duration of the slideshow will be the duration of the player

## Customization

<p align="center">
  <img src="https://react-web-media-player.herokuapp.com//static/media/custom.f8638e76.png" />
</p>

- Choose the menu color
- Choose the player title
- Choose the thumbnail
- Add your custom buttons
- Add your logo

To find how, look at the component properties explained [here](https://react-web-media-player.herokuapp.com/docs).