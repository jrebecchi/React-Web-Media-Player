import React, { Component } from 'react';
import { connect } from 'react-redux';
const REFRESH_TIME_IN_MILLISECONDS = 10;
const SPEED = 45; //45 RPM vinyl

class Vinyl extends Component {

    constructor(props) {
        super(props);
        this.vinyl = null;
        this.tempTime  = 0;
    };

    load = () => {
        this.vinyl = new Image();
        this.vinyl.onload = (e) => {
            this.props.dispatch({ type: 'VINYL_IS_READY' });
        }
        this.vinyl.src = this.props.vinyl;
    }

    play = () => {
        console.log("vinyl play");
        this.load(this.currentTime);
        this.tempTime = new Date();
        this.relaunchRefresh();
    };

    pause = () => {
        console.log("vinyl pause");
        this.stopRefresh();
    };

    stop = () => {
        console.log("vinyl stop");
        this.stopRefresh();
        this.props.dispatch({ type: 'INIT_VINYL_ANGLE' });
    };

    adaptImageToWidth = (width, height) => {
        let imgWidth = this.vinyl.width;
        let imgHeight = this.vinyl.height;
        let margin = (height - imgHeight / imgWidth * width) / 2;
        return {
            marginTop: margin + "px",
            width: "100%",
            height: (imgHeight / imgWidth * width) + "px",
        }
    };

    adaptImageToHeight = (width, height) => {
        let imgWidth = this.vinyl.width;
        let imgHeight = this.vinyl.height;
        let margin = (width - imgWidth / imgHeight * height) / 2;
        return {
            marginLeft: margin + "px",
            height: "100%",
            width: (imgWidth / imgHeight * height) + "px",
        }
    };

    relaunchRefresh = () => {
        this.stopRefresh();
        this.launchRefresh();
    }

    launchRefresh = () => {
        this.timerFunction = window.setInterval(this.refresh, REFRESH_TIME_IN_MILLISECONDS);

    }

    stopRefresh = () => {
        window.clearInterval(this.timerFunction);
    }

    refresh = () => {
        var now = new Date();
        var deltaTime = (now.getTime() - this.tempTime.getTime()) / 1000;
        this.tempTime = now;
        vinylAngle = SPEED * 360 / 60 * deltaTime % 360;
        this.props.dispatch({ type: 'UPDATE_VINYL_ANGLE', payload: {vinylAngle : vinylAngle}});
    };

    render = () => {

        let width, height, imageSliderStyle, src;
        if (this.props.vinyl !== null) {
            if (this.props.isFullscreenActivated) {
                width = this.props.fullscreenWidth;
                height = this.props.fullscreenHeight;
            } else {
                width = this.props.width;
                height = this.props.height;
            }
            let imgWidth = this.vinyl.width;
            let imgHeight = this.vinyl.height;

            if (imgWidth >= imgHeight) {
                if (imgHeight / imgWidth * width <= height) {
                    imageSliderStyle = this.adaptImageToWidth(width, height);
                } else {
                    imageSliderStyle = this.adaptImageToHeight(width, height);
                }
            } else {
                if (imgHeight / imgWidth * width <= height) {
                    imageSliderStyle = this.adaptImageToWidth(width, height);
                } else {
                    imageSliderStyle = this.adaptImageToHeight(width, height);
                }
            }
        }
        imageSliderStyle.transform = "rotate("+this.props.vinylAngle+"deg)"

        return (
            <img style={imageSliderStyle} src={this.props.vinyl} alt=""></img>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fullscreenWidth: window.innerWidth,
        fullscreenHeight: window.innerHeight,
        isFullscreenActivated: state.isFullscreenActivated,
        vinyl: state.vinyl,
        vinylAngle: state.vinylAngle,
        duration: state.duration,
        currentTime: state.currentTime,
        isFullScreenActivated: state.isFullScreenActivated,
        width: state.width,
        height: state.height,
    };
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(Vinyl);