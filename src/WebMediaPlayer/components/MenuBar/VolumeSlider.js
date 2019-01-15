import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VolumeSlider.css';
import './Button.css';

class VolumeSlider extends Component {
    constructor(props) {
        super(props);
        this.nodeScrubberButton = React.createRef();
        this.nodeTotalBar = React.createRef();
    }

    handleMouseDownVolumeBar = (e) => {
        e.stopPropagation();
        this.animateVolumeScrubberButton(e);
    }

    animateVolumeScrubberButton = (e) => {
        this.props.dispatch({ type: 'SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME' });
        this.props.dispatch({ type: 'PREVENT_MOUSE_LEAVE_VOLUME_SLIDER' });
        let volume = this.calculateVolumeFromXCoord(e.clientX);
        this.props.dispatch({ type: 'UPDATE_VOLUME', payload: { volume: volume } });
        document.addEventListener('mousemove', this.moveVolumeScrubberButton, true);
        document.addEventListener('mouseup', this.stopVolumeScrubberButton, true);
    };

    moveVolumeScrubberButton = (e) => {
        e.stopPropagation();
        let volume = this.calculateVolumeFromXCoord(e.clientX);
        this.props.dispatch({ type: 'UPDATE_VOLUME', payload: { volume: volume } });
    };

    stopVolumeScrubberButton = (e) => {
        e.stopPropagation();
        document.removeEventListener('mousemove', this.moveVolumeScrubberButton, true);
        document.removeEventListener('mouseup', this.stopVolumeScrubberButton, true);
        let volume = this.calculateVolumeFromXCoord(e.clientX);
        this.props.dispatch({ type: 'UPDATE_VOLUME', payload: { volume: volume } });
        this.props.dispatch({ type: 'ALLOW_MOUSE_LEAVE_VOLUME_SLIDER' });
    };

    calculateVolumeSliderLeftMargin = (volume) => {
        return volume * (100 - this.nodeScrubberButton.clientWidth / this.nodeTotalBar.clientWidth * 100) + "%";
    }

    calculateVolumeFromXCoord = (clientX) => {
        let maxX = this.nodeTotalBar.clientWidth;
        if (maxX === 0) {
            return;
        }
        let x = clientX - this.nodeTotalBar.getBoundingClientRect().left;
        if (x > maxX) x = maxX;
        if (x <= 0) {
            x = 0;
            this.props.dispatch({ type: 'MUTE' });
        } else if (this.props.isMuted) {
            this.props.dispatch({ type: 'UNMUTE' });
        }
        return x / maxX;
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'UPDATE_VOLUME_SLIDER_LEFT_MARGIN', payload: { volumeSliderLeftMargin: this.calculateVolumeSliderLeftMargin(this.props.volume) } });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.volume !== this.props.volume) {
            this.props.dispatch({ type: 'UPDATE_VOLUME_SLIDER_LEFT_MARGIN', payload: { volumeSliderLeftMargin: this.calculateVolumeSliderLeftMargin(this.props.volume) } });
        }
    }

    render = () => {
        return (
            <div className="wmp-tool-button wmp-volume-slider" onMouseDown={this.handleMouseDownVolumeBar}>
                <div className="wmp-volume-slider-total-bar" ref={node => (this.nodeTotalBar = node)}>
                    <div className="wmp-volume-slider-level-bar" style={{ width: this.props.volumeSliderLeftMargin }}></div>
                    <div className="wmp-volume-slider-left-bar" style={{ left: this.props.volumeSliderLeftMargin }}></div>
                    <div className="wmp-volume-slider-scrubber-button" style={{ left: this.props.volumeSliderLeftMargin }} ref={node => (this.nodeScrubberButton = node)}></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        volume: state.volume,
        pastVolume: state.pastVolume,
        isMuted: state.isMuted,
        volumeSliderLeftMargin: state.volumeSliderLeftMargin,
    };
};

export default connect(mapStateToProps)(VolumeSlider);