import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';

class NextButton extends Component {
  handleClick = () => {
    this.props.dispatch({ type: 'ASK_NEXT' });
  }
  
  render = () => {
    return (
      <div className="wmp-tool-button material-icons light-grey-to-white md-26">
        skip_next onClick={this.handleClick}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(NextButton);