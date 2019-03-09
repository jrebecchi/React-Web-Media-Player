import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from "./Channels/Video";
import Audio from "./Channels/Audio";
import Slideshow from "./Channels/Slideshow";
const MAX_DIFFERENCE_AUDIO_SLIDESHOW = 0.1; //in seconds
const BUFFER_UPDATE_PRECISION = 0.1; //in seconds

class Mixer extends Component {

    synchronize = () => {
        if (this.props.currentTime >= this.props.duration) {
            this.stop();
            this.props.dispatch({ type: 'READING_TERMINATED' });
            this.props.dispatch({ type: 'PAUSE' });
            this.props.dispatch({ type: 'SHOW_MENUS' });
            return;
        }
        if (this.props.hasVideo) {
            this.props.dispatch({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: this.video.getCurrentTime() } });
        } else {
            if (this.props.hasAudio) {
                if (this.audio.getDuration() > this.props.currentTime) {
                    this.props.dispatch({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: this.audio.getCurrentTime() } });
                    let diff = Math.abs(this.audio.getCurrentTime() - this.slideshow.getCurrentTime());
                    if (diff > MAX_DIFFERENCE_AUDIO_SLIDESHOW)//re-synchronize audio and slideshow 
                        this.slideshow.changeTime(this.audio.getCurrentTime());
                } else {
                    this.props.dispatch({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: this.slideshow.getCurrentTime() } });
                }
            } else {
                this.props.dispatch({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: this.slideshow.getCurrentTime() } });
            }
        }
        this.refreshBufferState();
    };

    refreshBufferState = () => {
        let timeRangeBuffered;
        if (this.props.hasVideo) {
            timeRangeBuffered = this.video.timeRangeBuffered(this.props.currentTime);
        } else {
            if (this.props.hasAudio) {
                let audioTimeRangeBuffered = this.audio.timeRangeBuffered(this.props.currentTime);
                let slideshowTimeRangeBuffered = this.slideshow.timeRangeBuffered(this.props.currentTime);
                if (this.audio.getDuration() < this.props.currentTime || audioTimeRangeBuffered === this.audio.getDuration()) {
                    timeRangeBuffered = this.slideshow.timeRangeBuffered(this.props.currentTime);
                } else {
                    timeRangeBuffered = (audioTimeRangeBuffered < slideshowTimeRangeBuffered) ? audioTimeRangeBuffered : slideshowTimeRangeBuffered;
                }
            } else {
                timeRangeBuffered = this.slideshow.timeRangeBuffered(this.props.currentTime);
            }
        }
        if (timeRangeBuffered !== this.props.timeRangeBuffered && Math.abs(timeRangeBuffered - this.props.timeRangeBuffered) >= BUFFER_UPDATE_PRECISION) {
            console.log(timeRangeBuffered);
            this.props.dispatch({ type: 'UPDATE_TIME_RANGE_BUFFERED', payload: { timeRangeBuffered: timeRangeBuffered } });
        }
    };

    play = () => {
        if (this.props.currentTime >= this.props.duration) {
            this.stop();
            this.props.dispatch({ type: 'NOT_LOADING' });
            this.props.dispatch({ type: 'PREVENT_MENU_HIDING' });
            this.props.dispatch({ type: 'PAUSE' });
            this.props.dispatch({ type: 'READING_TERMINATED' });
            this.props.dispatch({ type: 'SHOW_MENUS' });
            return;
        }
        window.clearInterval(this.bufferTimer);
        this.refreshBufferState();
        this.bufferTimer = window.setInterval(this.refreshBufferState);

        window.clearInterval(this.timer);
        this.synchronize();
        this.timer = window.setInterval(this.synchronize, 20);
        if (this.props.hasVideo) {
            this.video.play();
        } else {
            if (this.props.hasAudio)
                //if (this.props.currentTime < this.audio.getDuration())
                this.audio.play();
            this.slideshow.play();
        }
    };

    pause = () => {
        window.clearInterval(this.timer);
        if (this.props.isInitialized) {
            window.clearInterval(this.bufferTimer);
            this.refreshBufferState();
            this.bufferTimer = window.setInterval(this.refreshBufferState);
        }
        if (this.props.hasVideo) {
            this.video.pause(this.props.currentTime);
        } else {
            if (this.props.hasAudio)
                this.audio.pause(this.props.currentTime);
            this.slideshow.pause(this.props.currentTime);
        }
    };

    changeTime = (time) => {
        if (time >= this.props.duration) {
            this.stop();
            this.props.dispatch({ type: 'NOT_LOADING' });
            this.props.dispatch({ type: 'READING_TERMINATED' });
            this.props.dispatch({ type: 'PAUSE' });
            this.props.dispatch({ type: 'SHOW_MENUS' });
            return;
        }
        if (this.props.isPlaying) {
            window.clearInterval(this.timer);
            this.synchronize();
            this.timer = window.setInterval(this.synchronize, 20);
        }
        window.clearInterval(this.bufferTimer);
        this.refreshBufferState();
        this.bufferTimer = window.setInterval(this.refreshBufferState);
        if (this.props.hasVideo) {
            this.video.changeTime(time);
        } else {
            if (this.props.hasAudio)
                if (this.props.currentTime < this.audio.getDuration())
                    this.audio.changeTime(time);
            this.slideshow.changeTime(time);
        }
    };

    stop = () => {
        window.clearInterval(this.timer);
        window.clearInterval(this.bufferTimer);
        //this.props.currentTime = this.props.duration;
        if (this.props.hasVideo) {
            this.video.stop();
        } else {
            if (this.props.hasAudio)
                this.audio.stop();
            this.slideshow.stop();
        }
    };

    setVolume = (volume) => {
        if (this.props.hasVideo)
            this.video.setVolume(volume);
        else if (this.props.hasAudio)
            this.audio.setVolume(volume);
    };

    hasEnoughBuffered = () => {
        if (this.props.hasVideo) {
            return this.props.isVideoReady;
        } else {
            if (this.props.hasAudio)
                return this.props.isAudioReady && this.props.isSlideshowReady;
            else
                return this.props.isSlideshowReady;
        }
    }

    handleChannelsBufferStateChange = () => {
        if ((this.props.hasVideo && !this.props.isVideoReady)
            || (this.props.hasAudio && !this.props.isAudioReady) /*|| this.props.currentTime > this.audio.getDuration()*/
            || (this.props.hasSlideshow && !this.props.isSlideshowReady)) {

            this.props.dispatch({ type: 'LOADING' });
            console.log("isLoading");
            this.pause();
        } else {
            this.props.dispatch({ type: 'NOT_LOADING' });
            console.log("isNotLoading");
            if (this.props.isPlaying && !this.props.channelsWait) this.play();
        }
    }

    componentDidMount = () => {
        this.handleChannelsBufferStateChange();
        this.setVolume(this.props.volume);
    }

    componentDidUpdate = (prevprops) => {
        if (prevprops.isAudioReady !== this.props.isAudioReady
            || prevprops.isVideoReady !== this.props.isVideoReady
            || prevprops.isSlideshowReady !== this.props.isSlideshowReady) {
            this.handleChannelsBufferStateChange();
        }

        if (prevprops.isInitialized === false && this.props.isInitialized === true) {
            this.props.dispatch({ type: 'LOADING' });
            if (this.props.duration > 0)
                this.play();
        }

        if (prevprops.duration === 0 && this.props.duration > 0) {
            this.play();
        }

        if (prevprops.isPlaying !== this.props.isPlaying) {
            if (!this.props.channelsWait && this.props.isPlaying && this.hasEnoughBuffered() && this.props.duration > 0) this.play();
            else this.pause();
        }

        if (prevprops.channelsWait !== this.props.channelsWait) {
            if (!this.props.channelsWait && this.props.isPlaying && this.hasEnoughBuffered() & this.props.duration > 0) this.play();
            else this.pause();
        }

        if (prevprops.askedTime !== this.props.askedTime) {
            this.props.dispatch({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: this.props.askedTime } });
            this.changeTime(this.props.askedTime);
            if (this.props.isReadingTerminated) {
                this.props.dispatch({ type: 'READING_NOT_TERMINATED' });
                if (this.props.allowUnhighlightProgressBar) {
                    this.props.dispatch({ type: 'PLAY' });
                    this.props.dispatch({ type: 'ALLOW_MENU_HIDING' });
                }
            }
            this.props.dispatch({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: this.props.askedTime } });
        }

        if (prevprops.volume !== this.props.volume) {
            this.setVolume(this.props.volume)
        }

        if (prevprops.askNextImage !== this.props.askNextImage) {
            let time = this.slideshow.getTimeNextImage();
            this.props.dispatch({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: time } });
            this.changeTime(time);
            this.props.dispatch({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: time } });
        }

        if (prevprops.askPreviousImage !== this.props.askPreviousImage) {
            let time = this.slideshow.getTimePreviousImage();
            this.props.dispatch({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: time } });
            this.changeTime(time);
            this.props.dispatch({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: time } });
        }
    }

    render = () => {
        let video, audio, slideshow;
        if (this.props.hasVideo) {
            video = <Video ref={video => (this.video = video)} />;
        } else if (this.props.hasAudio) {
            audio = <Audio ref={audio => (this.audio = audio)} />;
            slideshow = <Slideshow ref={slideshow => (this.slideshow = slideshow)} />
        } else if (this.props.hasSlideshow) {
            slideshow = <Slideshow ref={slideshow => (this.slideshow = slideshow)} />
        }
        return (
            <div>
                {video}
                {audio}
                {slideshow}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        channelsWait: state.channelsWait,
        timeRangeBuffered: state.timeRangeBuffered,
        askNextImage: state.askNextImage,
        askPreviousImage: state.askPreviousImage,
        volume: state.volume,
        isMuted: state.isMuted,
        hasVideo: state.hasVideo,
        isVideoReady: state.isVideoReady,
        hasAudio: state.hasAudio,
        isAudioReady: state.isAudioReady,
        hasSlideshow: state.hasSlideshow,
        isSlideshowReady: state.isSlideshowReady,
        isInitialized: state.isInitialized,
        currentTime: state.currentTime,
        askedTime: state.askedTime,
        isPlaying: state.isPlaying,
        duration: state.duration,
        isReadingTerminated: state.isReadingTerminated,
        allowUnhighlightProgressBar: state.allowUnhighlightProgressBar,
    };
};

export default connect(mapStateToProps)(Mixer);