import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Spinner.css';

class Spinner extends Component {

    render = () => {
        return (
            <div class="wmp-spinner-container" hidden={!this.props.isLoading}>
              <div class="wmp-animate-loader">
                <svg class="wmp-animate-loader-circular" viewBox="25 25 50 50">
                    <circle class="wmp-animate-loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="4"></circle>
                </svg>
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading
    };
};
  
export default connect(mapStateToProps)(Spinner);