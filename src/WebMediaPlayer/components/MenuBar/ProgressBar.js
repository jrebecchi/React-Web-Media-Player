import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProgressBar.css';

class ProgressBar extends Component {

    render = () => {
        return (
            <div className="wmp-progress-bar-wrapper">
                <div className="wmp-progress-bar"></div>
                <div className="wmp-progress-bar loaded"></div>
                <div className="wmp-progress-bar progression"></div>
                <div className="wmp-progress-bar desired"></div>
                <div className="wmp-scrubber-button"></div>
              </div> 
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps)(ProgressBar);