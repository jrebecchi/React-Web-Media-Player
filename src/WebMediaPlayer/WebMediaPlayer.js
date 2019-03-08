import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { getInitState } from './services/StateInitiator';
import Container from './components/Container';

import thereducer from './reducers/Reducer'; 

class WebMediaPlayer extends Component {

  constructor(options) {
    super(options);
    this.store = createStore(thereducer);
    this.store.dispatch({ type: 'INIT_STATE', payload: { state: getInitState(this.props) } });
  };

  render() {
    return (
      <Provider store={this.store}>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <Container />
      </Provider>
    );
  }
}

export default WebMediaPlayer;
