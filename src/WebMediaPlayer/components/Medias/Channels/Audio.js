import React, { Component } from 'react';
import { connect } from 'react-redux';
//const MINIMUM_BUFFERED_TIME = 1;

class Audio extends Component {

    isPlaying = () => {
        return this.audio.currentTime > 0 && !this.audio.paused && !this.audio.ended && this.audio.readyState > 2;
    }

    getCurrentTime = () => this.audio.currentTime;
    
    load = (startTime) => {
        if (this.isPlaying()) this.pause();
        //this.props.dispatch({ type: 'AUDIO_IS_NOT_READY' });
        if (startTime === undefined || startTime < 0 || startTime === 0) {
            console.log("load");
            this.audio.play();
        } else {
            this.audio.currentTime = startTime;
        }
        //if (!this.updateTimer) this.updateTimer = window.setInterval(this.enoughBuffered.bind(this), 100)
    };

    enoughBuffered = () => {
        /*
        if (this.hasEnoughBuffered(this.audio.currentTime)) {
            window.clearInterval(this.updateTimer);
            this.updateTimer = null;
            this.audio.removeEventListener("progress", this.enoughBuffered);
            this.props.dispatch({ type: 'AUDIO_IS_READY' });
        }
        */
    };

    play = (time) => {
        console.log("play");
        //this.audio.currentTime = time;
        if (!this.isPlaying()) this.audio.play();
    };

    changeTime = (time) => {
        console.log("changetime");
        this.audio.currentTime = time;
    };

    pause = (time) => {
        if (time !== undefined) this.currentTime = time;
        console.log("pause");
        if (this.isPlaying()) this.audio.pause();
    };


    stop = () => {
        if (this.isPlaying()) this.audio.pause();
        this.audio.currentTime = this.props.duration;
    };

    /*hasEnoughBuffered = () => {
        return this.props.isAudioReady;
        
        if (!this.props.isAudioReady) {
            return false
        }
        for (let i = 0; i < this.audio.buffered.length; i++) {
            let startTime = this.audio.buffered.start(i);
            let endTime = this.audio.buffered.end(i);
            let hasStartTimeBuffered, minimumTimeToBeLoaded;
            if (time >= startTime && time <= endTime) {
                hasStartTimeBuffered = true;
            } else {
                hasStartTimeBuffered = false;
            }
            minimumTimeToBeLoaded = time + MINIMUM_BUFFERED_TIME;
            if (minimumTimeToBeLoaded > this.audio.duration) minimumTimeToBeLoaded = this.audio.duration;

            if (minimumTimeToBeLoaded > this.props.duration)
                minimumTimeToBeLoaded = this.props.duration;

            if (hasStartTimeBuffered && minimumTimeToBeLoaded <= endTime) {
                return true;
            }
        }
        return false;
};*/

    timeRangeBuffered = (time) => {
        for (let i = 0; i < this.audio.buffered.length; i++) {
            let portionStartTime = this.audio.buffered.start(i);
            let portionEndTime = this.audio.buffered.end(i);
            if (time >= portionStartTime && time <= portionEndTime) {
                return portionEndTime
            }
        }
    };

    setVolume = (volume) => {
        this.audio.volume = volume;
    };

    mute = () => {
        this.audio.muted = true;
    }

    unMute = () => {
        this.audio.muted = false;
    }

    getDuration = () => {
        return this.audio.duration;
    }

    handleWaiting = () => {
        console.log("waiting");
        this.props.dispatch({ type: 'AUDIO_IS_NOT_READY' });
    }

    handleCanPlayThrough = () => {
        console.log("Can play through");
        this.props.dispatch({ type: 'AUDIO_IS_READY' });
    }

    render = () => {
        return (
            <audio src={this.props.audio} ref={audio => this.audio = audio} onWaiting={this.handleWaiting} onCanPlayThrough={this.handleCanPlayThrough} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAudioReady: state.isAudioReady,
        duration: state.duration,
        audio: state.audio,
    };
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(Audio);