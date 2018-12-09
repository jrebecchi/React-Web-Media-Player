import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { getInitState } from './service/StateInitiator'
import './WebMediaPlayer.css';

class WebMediaPlayer extends Component {

  constructor(options) {
    super(options);
    this.store = createStore(this.reducer);
  };

  reducer = (state, action) => {
    if(state === undefined){
      state =  getInitState(this.props);
    }
    if(action === undefined){
      return state;
    }
    switch(action.type) {
      case 'INCREMENT':
        return {
          count: state.count + 1
        };
      case 'DECREMENT':
        return {
          count: state.count - 1
        };
      default:
        return state;
    }
  };

  render() {
    console.log(this.store.getState())
    return (
      <Provider store={this.store}>
        <div>
          <h1>Future Web Media player here !</h1>
          <hr/>
        </div>
      </Provider>
    );
  }
}

export default WebMediaPlayer;

