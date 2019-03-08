import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';

const previousLogo =
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
      <path className="wmp-tool-button-logo" fill="#e4e5e8" d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
  </svg>

class PreviousButton extends Component {
  handleClick = () => {
    this.props.dispatch({ type: 'ASK_PREVIOUS_IMAGE' });
    this.props.dispatch({ type: 'USER_ACTIVE' });
  }
  
  render = () => {
    return (
      <div className="wmp-tool-button logo-padding-small" onClick={this.handleClick}>
        {previousLogo}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(PreviousButton);