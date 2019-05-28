import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { getInitState } from './services/StateInitiator';
import Container from './components/Container';

import reducer from './reducers/Reducer';

class ReactWebMediaPlayer extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    const store = (this.props.store !== undefined) ? this.props.store : createStore(reducer);
    store.dispatch({ type: 'INIT_STATE', payload: { state: getInitState(this.props) } });
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

export default ReactWebMediaPlayer;
