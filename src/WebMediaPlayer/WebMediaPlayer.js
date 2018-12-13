import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { getInitState } from './services/StateInitiator';
import Container from './components/Container';
import highlightPlayer from './actions/HighlightPlayer';
import unhighlightPlayer from './actions/UnhighlightPlayer';
import initializePlayer from './actions/InitializePlayer'


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
      
