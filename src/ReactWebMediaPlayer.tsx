import React from 'react';
import { Component } from 'react';
import { createStore, Store } from 'redux';
import { getInitState } from './services/StateInitiator';
import Container from './components/Container'
import reducer from './state/reducers/Reducer';
import { IButton } from './state/types/IButton';
import { ISlide } from './state/types/ISlide';
import { Provider } from 'react-redux';

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
