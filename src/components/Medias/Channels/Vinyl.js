import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Vinyl.css';

class Vinyl extends Component {

    constructor(props) {
        super(props);
        this.load();
    }

    load = () => {
        this.vinyl = new Image();
        this.vinyl.onload = (e) => {
            this.props.dispatch({ type: 'VINYL_IS_READY' });
        }
        this.vinyl.src = this.props.vinyl;
    }

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

    render = () => {
        if (!this.props.isVinylReady)
            return '';
        let width, height;
        let imageSliderStyle = {};
        let blackHole, blackHoleSize;
        if (this.vinyl !== null) {
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
                    blackHoleSize = width;
                    imageSliderStyle = this.adaptImageToWidth(width, height);
                } else {
                    blackHoleSize = height;
                    imageSliderStyle = this.adaptImageToHeight(width, height);
                }
            } else {
                if (imgHeight / imgWidth * width <= height) {
                    blackHoleSize = width;
                    imageSliderStyle = this.adaptImageToWidth(width, height);
                } else {
                    blackHoleSize = height;
                    imageSliderStyle = this.adaptImageToHeight(width, height);
                }
            }
        }
        if (this.props.rpm !== 0) {
            let time = Math.round(60 / this.props.rpm);
            imageSliderStyle.animation = `vinyl-spin ${time}s linear infinite`;
            imageSliderStyle.borderRadius = "100%";
            imageSliderStyle.overflow = "hidden";
            if (this.props.isPlaying){
                imageSliderStyle.animationPlayState = "running";
            } else {
                imageSliderStyle.animationPlayState = "paused";
            }
            blackHole = (
                <div style={{
                    marginLeft: "-" + blackHoleSize / 20 + "px",
                    marginTop: "-" + blackHoleSize / 20 + "px",
                    height: "" + blackHoleSize / 10 + "px",
                    width: "" + blackHoleSize / 10 + "px",
                    backgroundColor: "black",
                    borderRadius: "100%",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    zIndex: "10"
                }} />
            );
        }

        return (
            <span>
                {blackHole}
                <img style={imageSliderStyle} src={this.props.vinyl} alt=""></img>
            </span>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        isInitialized: state.isInitialized,
        fullscreenWidth: window.innerWidth,
        fullscreenHeight: window.innerHeight,
        isFullscreenActivated: state.isFullscreenActivated,
        vinyl: state.vinyl,
        isVinylReady: state.isVinylReady,
        currentTime: state.currentTime,
        width: state.width,
        height: state.height,
        rpm: state.rpm,
        isPlaying: state.isPlaying,
    };
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(Vinyl);