import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { getInitState } from './services/StateInitiator';
import Container from './components/Container';
import highlightPlayer from './actions/HighlightPlayer';
import unhighlightPlayer from './actions/UnhighlightPlayer';
import initializePlayer from './actions/InitializePlayer';
import showVolumeSlider from './actions/ShowVolumeSlider';
import hideVolumeSlider from './actions/HideVolumeSlider';
import switchFullscreen from './actions/SwitchFullscreen';
import adaptPlayerToFullscreen from './actions/AdaptPlayerToFullscreen';
import adaptPlayerToNonFullscreen from './actions/AdaptPlayerToNonFullscreen';


class WebMediaPlayer extends Component {

  constructor(options) {
    super(options);
    this.store = createStore(this.reducer);
  };

  reducer = (state, action) => {
    if (state === undefined) {
      state = getInitState(this.props);
    }
    if (action === undefined) {
      return state;
    }
    switch (action.type) {
      case 'FULL_SCREEN_ENABLED':
        return adaptPlayerToFullscreen(state);
      case 'FULL_SCREEN_DISABLED':
        return adaptPlayerToNonFullscreen(state);
      case 'SWITCH_FULLSCREEN_STATE':
        return switchFullscreen(state);
      case 'SHOW_VOLUME_SLIDER':
        return showVolumeSlider(state);
      case 'HIDE_VOLUME_SLIDER':
        return hideVolumeSlider(state);
      case 'HIGHLIGHT_PLAYER':
        return highlightPlayer(state);
      case 'UNHIGHLIGHT_PLAYER':
        return unhighlightPlayer(state);
      case 'INITIALIZE_PLAYER':
        return initializePlayer(state);
      default:
        return state;
    }
  };

  render() {
    console.log(this.store.getState())
    return (
      <Provider store={this.store}>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <Container/>
      </Provider>
          );
        }
      }
      
      export default WebMediaPlayer;
      
