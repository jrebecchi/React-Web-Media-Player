import React from 'react';
import ReactDOM from 'react-dom';
import WebMediaPlayer from './WebMediaPlayer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WebMediaPlayer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
