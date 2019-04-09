import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VolumeControl.css';
import './Button.css';
import { isInsideElement } from '../../services/Utils';

const volumeDownLogo =
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
        <path className="wmp-tool-button-logo" fill="#e4e5e8" d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
        <path d="M0 0h24v24H0z" fill="none" />
    </svg>

const volumeOffLogo =
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
        <path className="wmp-tool-button-logo" fill="#e4e5e8" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
        <path d="M0 0h24v24H0z" fill="none" />
    </svg>

const volumeUpLogo =
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
        <path className="wmp-tool-button-logo" fill="#e4e5e8" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        <path d="M0 0h24v24H0z" fill="none" />
    </svg>


class VolumeControl extends Component {
    constructor(props) {
        super(props);
        this.nodeScrubberButton = React.createRef();
        this.nodeTotalBar = React.createRef();
    }

    handleMouseLeave = (e) => {
        if (this.props.allowMouseLeaveVolumeSlider)
            this.props.dispatch({ type: 'HIDE_VOLUME_SLIDER' });
    }

    handleMouseEnter = (e) => {
        e.stopPropagation();
        this.props.dispatch({ type: 'SHOW_VOLUME_SLIDER' });
    }

    handleClick = (e) => {
        e.stopPropagation();
        this.props.dispatch({ type: 'USER_ACTIVE' });
        if (this.props.muted) {
            this.props.dispatch({ type: 'UNMUTE' });
            this.props.dispatch({ type: 'UPDATE_VOLUME', payload: { volume: this.props.volume } });
        } else if (this.props.volume === 0) {
            this.props.dispatch({ type: 'UPDATE_VOLUME', payload: { volume: this.props.pastVolume } });
        } else {
            this.props.dispatch({ type: 'SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME' });
            this.props.dispatch({ type: 'UPDATE_VOLUME', payload: { volume: 0 } });
        }
        this.props.dispatch({ type: 'SHOW_VOLUME_SLIDER' });
    }

    handleMouseDownVolumeBar = (e) => {
        e.stopPropagation();
        this.props.dispatch({ type: 'USER_ACTIVE' });
        if (this.props.muted)
            this.props.dispatch({ type: 'UNMUTE' });
        this.animateVolumeScrubberButton(e);
    }

    animateVolumeScrubberButton = (e) => {
        if (this.props.volume !== 0)
            this.props.dispatch({ type: 'SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME' });
        this.props.dispatch({ type: 'PREVENT_MENU_HIDING' });
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
        this.props.dispatch({ type: 'ALLOW_MENU_HIDING' });
        this.props.dispatch({ type: 'USER_ACTIVE' });
        if (!isInsideElement(this.spanContainer, e))
            this.props.dispatch({ type: 'HIDE_VOLUME_SLIDER' });
    };

    calculateVolumeSliderLeftMargin = (volume) => {
        if (this.props.muted)
            return "0%";
        else
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
        }
        return x / maxX;
    }

    componentDidMount = () => {
        if (this.props.volumeSliderLeftMargin === "calculateMe!") {
            this.props.dispatch({ type: 'UPDATE_VOLUME_SLIDER_LEFT_MARGIN', payload: { volumeSliderLeftMargin: this.calculateVolumeSliderLeftMargin(this.props.volume) } });
            this.props.dispatch({ type: 'HIDE_VOLUME_SLIDER' });
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.volume !== this.props.volume || prevProps.muted !== this.props.muted) {
            this.props.dispatch({ type: 'UPDATE_VOLUME_SLIDER_LEFT_MARGIN', payload: { volumeSliderLeftMargin: this.calculateVolumeSliderLeftMargin(this.props.volume) } });
        }
    }

    render = () => {
        let icon, volumeSlider;
        if (this.props.volume === 0 || this.props.muted) {
            icon = volumeOffLogo;
        } else if (this.props.volume < 0.5) {
            icon = volumeDownLogo;
        } else {
            icon = volumeUpLogo;
        }
        if (this.props.showVolumeSlider) {
            volumeSlider = (
                <div className="wmp-tool-button wmp-volume-slider" onMouseDown={this.handleMouseDownVolumeBar} >
                    <div className="wmp-volume-slider-total-bar" ref={node => (this.nodeTotalBar = node)}>
                        <div className="wmp-volume-slider-level-bar" style={{ width: this.props.volumeSliderLeftMargin }}></div>
                        <div className="wmp-volume-slider-left-bar" style={{ left: this.props.volumeSliderLeftMargin }}></div>
                        <div className="wmp-volume-slider-scrubber-button" style={{ left: this.props.volumeSliderLeftMargin }} ref={node => (this.nodeScrubberButton = node)}></div>
                    </div>
                </div>
            );
        }

        return (
            <span onMouseLeave={this.handleMouseLeave} ref={node => (this.spanContainer = node)}>
                <div className="wmp-tool-button logo-padding-medium" onMouseEnter={this.handleMouseEnter} onClick={this.handleClick}>
                    {icon}
                </div>
                {volumeSlider}

            </span>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        volume: state.volume,
        isInitialized: state.isInitialized,
        pastVolume: state.pastVolume,
        volumeSliderLeftMargin: state.volumeSliderLeftMargin,
        showVolumeSlider: state.showVolumeSlider,
        allowMouseLeaveVolumeSlider: state.allowMouseLeaveVolumeSlider,
        muted: state.muted
    };
};

export default connect(mapStateToProps)(VolumeControl);