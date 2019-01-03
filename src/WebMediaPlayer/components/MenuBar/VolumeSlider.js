import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VolumeSlider.css';
import './Button.css';

class VolumeSlider extends Component {

    render = () => {
        return (
            <div className="wmp-tool-button wmp-volume-slider">
                <div className="wmp-volume-slider-total-bar">
                <div className="wmp-volume-slider-level-bar"></div>
                    <div className="wmp-volume-slider-left-bar"></div>
                    <div className="wmp-volume-slider-scrubber-button"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        volume: state.volume,
        pastVolume: state.pastVolume
    };
};

export default connect(mapStateToProps)(VolumeSlider);
