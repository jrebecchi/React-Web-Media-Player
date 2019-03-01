import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';

class PreviousButton extends Component {
  handleClick = () => {
    this.props.dispatch({ type: 'ASK_PREVIOUS' });
  }
  
  render = () => {
    return (
      <div className="wmp-tool-button material-icons light-grey-to-white md-26" onClick={this.handleClick}>
        skip_previous
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(PreviousButton);