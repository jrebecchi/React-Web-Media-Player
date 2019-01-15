import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProgressBar.css';

class ProgressBar extends Component {

    render = () => {
        return (
            <div className="salefi-player-progress-bar-wrapper">
                <div className="salefi-player-progress-bar"></div>
                <div className="salefi-player-progress-bar loaded"></div>
                <div className="salefi-player-progress-bar progression"></div>
                <div className="salefi-player-progress-bar desired"></div>
                <div className="salefi-player-scrubber-button hide"></div>
              </div> 
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps)(ProgressBar);