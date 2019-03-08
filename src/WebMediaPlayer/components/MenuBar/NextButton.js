import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';

const nextLogo =
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
    <path className="wmp-tool-button-logo" fill="#e4e5e8" d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>

class NextButton extends Component {
  handleClick = () => {
    this.props.dispatch({ type: 'ASK_NEXT_IMAGE' });
    this.props.dispatch({ type: 'USER_ACTIVE' });
  }
  
  render = () => {
    return (
      <div onClick={this.handleClick} className="wmp-tool-button logo-padding-small">
        {nextLogo}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(NextButton);

