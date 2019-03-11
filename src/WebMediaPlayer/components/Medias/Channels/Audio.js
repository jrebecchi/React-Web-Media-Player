import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isIE } from '../../../services/Utils';
class Audio extends Component {

    isPlaying = () => {
        return !this.audio.paused;
    }

    getCurrentTime = () => this.audio.currentTime;

    load = (startTime) => {
        if (this.isPlaying()) this.pause();
        //this.props.dispatch({ type: 'AUDIO_IS_NOT_READY' });
        if (startTime === undefined || startTime < 0 || startTime === 0) {
            console.log("audio load");
            this.audio.load();
        } else {
            this.audio.currentTime = startTime;
        }
        //if (!this.updateTimer) this.updateTimer = window.setInterval(this.enoughBuffered.bind(this), 100)
    };

    play = () => {
        console.log("audio play");
        //this.audio.currentTime = time;
        if (!this.isPlaying()) {
            let playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Automatic playback started!
                }).catch(_ => {
                    // Auto-play was prevented
                });
            }

        }
    };

    changeTime = (time) => {
        console.log("audio changetime");
        this.audio.currentTime = time;
    };

    pause = (time) => {
        if (time !== undefined) this.currentTime = time;
        console.log("audio pause");
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
        return time;
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
        if (!isIE())
            this.props.dispatch({ type: 'AUDIO_IS_NOT_READY' });
    }

    handleCanPlayThrough = () => {
        console.log("Can play through");
        if (!isIE())
            this.props.dispatch({ type: 'AUDIO_IS_READY' });
    }

    handleSeeking = () => {
        console.log("seeking");
        if (isIE())
            this.props.dispatch({ type: 'AUDIO_IS_NOT_READY' });
    }

    handleSeeked = () => {
        console.log("seeked");
        if (isIE())
            this.props.dispatch({ type: 'AUDIO_IS_READY' });
    }

    handlePlay = () => {
        console.log("played");
        if (isIE())
            this.props.dispatch({ type: 'NOT_LOADING' });
    } 

    render = () => {
        return (
            <audio
                src={this.props.audio}
                ref={audio => this.audio = audio}
                onWaiting={this.handleWaiting}
                onCanPlayThrough={this.handleCanPlayThrough}
                onSeeked={this.handleSeeked}
                onSeeking={this.handleSeeking}
                onPlay={this.handlePlay}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        duration: state.duration,
        audio: state.audio,
    };
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(Audio);