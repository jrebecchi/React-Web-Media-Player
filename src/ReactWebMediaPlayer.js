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

  shouldComponentUpdate = (nextProps) => {
    this.store.dispatch({ type: 'INIT_STATE', payload: { state: getInitState(nextProps) } });
    return true;
  }

  componentWillMount = () => {
    this.store = (this.props.store !== undefined) ? this.props.store : createStore(reducer);
    this.store.dispatch({ type: 'INIT_STATE', payload: { state: getInitState(this.props) } });
  }

  render() {
    return (
      <Provider store={this.store}>
        <Container />
      </Provider>
    );
  }
}

export default ReactWebMediaPlayer;
