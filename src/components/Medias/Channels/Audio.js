import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isIE } from '../../../services/Utils';
const FLOAT_IMPRECISION = 0.1;

class Audio extends Component {

    isPlaying = () => {
        return !this.audio.paused;
    }

    getCurrentTime = () => this.audio.currentTime;

    load = () => {
        this.audio.load();
    };

    play = () => {
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
        this.audio.currentTime = time;
    };

    pause = () => {
        if (this.isPlaying()) this.audio.pause();
    };

    stop = () => {
        if (this.isPlaying()) this.audio.pause();
        this.audio.currentTime = this.props.duration;
    };

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
        if (!isIE() && this.audio.currentTime < (this.audio.duration - FLOAT_IMPRECISION))
            this.props.dispatch({ type: 'AUDIO_IS_NOT_READY' });
    }

    handleCanPlayThrough = () => {
        if (!isIE())
            this.props.dispatch({ type: 'AUDIO_IS_READY' });
    }

    handleSeeking = () => {
        if (isIE())
            this.props.dispatch({ type: 'AUDIO_IS_NOT_READY' });
    }

    handleSeeked = () => {
        if (isIE())
            this.props.dispatch({ type: 'AUDIO_IS_READY' });
    }

    handlePlay = () => {
        if (isIE()){
            this.props.dispatch({ type: 'AUDIO_IS_READY' });
        }
    }

    handleLoadedMetaData = () => {
        if (this.props.hasVinyl) {
            let duration = this.audio.duration;
            this.props.dispatch({ type: 'UPDATE_DURATION', payload: { duration: duration } });
        }
    }

    componentDidMount = () => {
        if(this.props.muted)
            this.mute();
    }

    shouldComponentUpdate = (nextProps) => {
        //player props changed
        if (this.props.initTime !== nextProps.initTime) this.load();
        return true;
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
                onLoadedMetadata={this.handleLoadedMetaData}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        duration: state.duration,
        audio: state.audio,
        hasVinyl: state.hasVinyl,
        muted: state.muted,
        initTime: state.initTime
    };
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(Audio);