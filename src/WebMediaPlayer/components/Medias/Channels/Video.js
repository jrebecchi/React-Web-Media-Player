import React, { Component } from 'react';
import { connect } from 'react-redux';
//const MINIMUM_BUFFERED_TIME = 1;

class Video extends Component {

    isPlaying = () => {
        return this.video.currentTime > 0 && !this.video.paused && !this.video.ended && this.video.readyState > 2;
    }

    getCurrentTime = () => this.video.currentTime;

    load = (startTime) => {
        console.log("load video");
        if (this.isPlaying()) this.pause();
        //if(!this.hasEnoughBuffered(startTime)) this.props.dispatch({ type: 'VIDEO_IS_NOT_READY' });
        if ((startTime === undefined || startTime < 0 || startTime === 0) && this.props.duration === 0) {
            //this.isLoadNotStarted = false;
            this.video.load();
        } else {
            this.video.currentTime = startTime;
        }
        //if (!this.updateTimer) this.updateTimer = window.setInterval(this.enoughBuffered, 100)

    };
    /*
    enoughBuffered = () => {
        if (this.hasEnoughBuffered(this.video.currentTime)) {
            window.clearInterval(this.updateTimer);
            this.updateTimer = null;
            this.video.removeEventListener("progress", this.enoughBuffered);
            this.props.dispatch({ type: 'VIDEO_IS_READY' });
        }
    };*/

    play = (time) => {
        console.log("play video");
        //this.video.currentTime = time;
        if (!this.isPlaying()) {
            this.video.play();
        }
    };

    changeTime = (time) => {
        console.log("changetime video");
        this.video.currentTime = time;
    };

    pause = (time) => {
        if (time !== undefined) this.currentTime = time;
        console.log("pause video");
        if (this.isPlaying()) this.video.pause();
    };

    stop = () => {
        console.log("stop video");
        if (this.isPlaying()) this.video.pause();
        this.video.currentTime = this.props.duration;
    };

    /*hasEnoughBuffered = (time) => {
        console.log("hasbufferedenough");
        return this.props.isVideoReady;
        if (!this.props.isVideoReady) {
            return false;
        }
        for (let i = 0; i < this.video.buffered.length; i++) {
            let startTime = this.video.buffered.start(i);
            let endTime = this.video.buffered.end(i);
            let hasStartTimeBuffered, minimumTimeToBeLoaded;
            if (time >= startTime && time <= endTime) {
                hasStartTimeBuffered = true;
            } else {
                hasStartTimeBuffered = false;
            }
            minimumTimeToBeLoaded = time + MINIMUM_BUFFERED_TIME;
            if (minimumTimeToBeLoaded > this.video.duration) minimumTimeToBeLoaded = this.video.duration;

            if (minimumTimeToBeLoaded > this.props.duration)
                minimumTimeToBeLoaded = this.props.duration;

            if (hasStartTimeBuffered && minimumTimeToBeLoaded <= endTime) {
                return true;
            }
        }
        return false;
    };*/

    timeRangeBuffered = (time) => {
        for (let i = 0; i < this.video.buffered.length; i++) {
            let portionStartTime = this.video.buffered.start(i);
            let portionEndTime = this.video.buffered.end(i);
            if (time >= portionStartTime && time <= portionEndTime) {
                return portionEndTime
            }
        }
        return time;
    };

    displayVideo = () => {
        let width, height;
        if (this.props.isFullscreenActivated) {
            width = window.screen.width;
            height = window.screen.height;
        } else {
            width = this.props.width;
            height = this.props.height;
        }
        this.video.width = width;
        this.video.height = height;
    };

    setVolume = (volume) => {
        this.video.volume = volume;
    };

    mute = () => {
        this.video.muted = true;
    }

    unMute = () => {
        this.video.muted = false;
    }

    getDuration = () => {
        return this.video.duration;
    }

    handleWaiting = () => {
        console.log("waiting event");
        this.props.dispatch({ type: 'VIDEO_IS_NOT_READY' });
    }

    handleCanPlayThrough = () => {
        console.log("Can play through event");
        this.props.dispatch({ type: 'VIDEO_IS_READY' });
    }

    handleLoadedMetaData = () => {
        let duration = this.video.duration;
        this.props.dispatch({ type: 'UPDATE_DURATION', payload: { duration: duration } });
        this.props.dispatch({ type: 'UPDATE_VIDEO_WIDTH', payload: { videoWidth: this.video.videoWidth } });
        this.props.dispatch({ type: 'UPDATE_VIDEO_HEIGHT', payload: { videoHeight: this.video.videoHeight } });
    }

    adaptImageToWidth = (width, ) => {
        return {
            marginTop: (this.props.fullscreenHeight - this.props.videoHeight / this.props.videoWidth * this.props.fullscreenWidth) / 2,
            width: width,
            height: (this.props.videoHeight / this.props.videoWidth * this.props.fullscreenWidth),
        }
    };

    adaptImageToHeight = (height) => {
        return {
            marginLeft: (this.props.fullscreenWidth - this.props.videoWidth / this.props.videoHeight * this.props.fullscreenHeight) / 2,
            height: height,
            width: (this.props.videoWidth / this.props.videoHeight * this.props.fullscreenHeight),
        }
    };

    render = () => {
        let dimensions;
        if (this.props.isFullscreenActivated) {
            if (this.props.videoWidth >= this.props.videoHeight) {
                if (this.props.videoHeight / this.props.videoWidth * this.props.fullscreenWidth <= this.props.fullscreenHeight) {
                    dimensions = this.adaptImageToWidth(this.props.fullscreenWidth);
                } else {
                    dimensions = this.adaptImageToHeight(this.props.fullscreenHeight);
                }
            } else {
                if (this.props.videoHeight / this.props.videoWidth * this.props.fullscreenWidth <= this.props.fullscreenHeight) {
                    dimensions = this.adaptImageToWidth(this.props.fullscreenWidth);
                } else {
                    dimensions = this.adaptImageToHeight(this.props.fullscreenHeight);
                }
            }
        } else {
            dimensions = {
                width: this.props.width,
                height: this.props.height,
            }
        }
        return (
            <video
                width={dimensions.width}
                style={{marginLeft: dimensions.marginLeft, marginTop: dimensions.marginTop}}
                ref={video => (this.video = video)}
                height={dimensions.height}
                onLoadedMetadata={this.handleLoadedMetaData}
                onWaiting={this.handleWaiting}
                onCanPlayThrough={this.handleCanPlayThrough}
            >
                <source src={this.props.video} />
            </video>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fullscreenWidth: window.innerWidth,
        fullscreenHeight: window.innerHeight,
        videoHeight: state.videoHeight,
        videoWidth: state.videoWidth,
        isFullscreenActivated: state.isFullscreenActivated,
        duration: state.duration,
        video: state.video,
        width: state.width,
        height: state.height
    };
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(Video);