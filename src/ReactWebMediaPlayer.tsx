import React from 'react';
import { Component } from 'react';
import { getInitState } from './services/StateInitiator';
import Container from './components/Container'
import { IButton } from './state/types/IButton';
import { ISlide } from './state/types/ISlide';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { Store } from '@reduxjs/toolkit';
import { actions } from './state/reducers/Reducer';

namespace ReactWebMediaPlayer {
  export interface Props {
    store?: Store
    allowFullFrame?: boolean;
    autoplay?: boolean;
    audio?: string;
    buttons?: IButton[];
    currentTime: number;
    color?: string;
    height?: number;
    logo?: { img: string, href?: string };
    muted?: boolean;
    slideshow?: ISlide[];
    style?: Record<string, string>;
    thumbnail?: string;
    title?: string;
    titleHref?: string;
    video?: string;
    vinyl?: { img: string, rpm?: number }
    width?: number;
    volume: number;
    id?: string;
    isTestEnvironment?: boolean;
  }
}

class ReactWebMediaPlayer extends Component<ReactWebMediaPlayer.Props> {
  private store: Store;

  constructor(props: ReactWebMediaPlayer.Props) {
    super(props);
  };

  shouldComponentUpdate = (nextProps: ReactWebMediaPlayer.Props) => {
    this.store.dispatch(actions.initializeState(getInitState(nextProps)));
    return true;
  }

  componentWillMount = () => {
    this.store = (this.props.store !== undefined) ? this.props.store : store;
    this.store.dispatch(actions.initializeState(getInitState(this.props)));
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
