import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from "./Channels/Video";
import Audio from "./Channels/Audio";
import Slideshow from "./Channels/Slideshow";
const MAX_DIFFERENCE_AUDIO_SLIDESHOW = 0.1; //in seconds

class Mixer extends Component {

    /*
    init = (options) => {
        this.props = new SlideshowModel(options);
        this.eventBus = new EventBus();
        this.utils = new Utils(this);
        this.view = new View(this);
        this.menuController = new MenuController(this);
        this.fullscreenController = new FullscreenController(this)
        if (this.props.hasVideo){
            this.video = new VideoController(this);
        } else {
            if (this.props.hasAudio)
                this.audio = new AudioController(this);
            this.slideshow = new SlideshowController(this);
        }                
        this.eventHandler = new EventHandler(this);
    }
    */

    //const addEventListener = () => {
    /*
        this.eventBus.on("wait-for-mouse-stop", (e) => {
            this.menuController.waitForMouseStop();
        });

        this.eventBus.on("update-past-volume-state", () => {
            this.props.pastVolume = this.props.volume;
        });

        
        this.eventBus.on("change-volume", (e) => {
            e.stopPropagation();
            let maxX = this.view.volumeTotalBar.clientWidth - this.view.volumeScrubberButton.clientWidth;
            if(maxX === 0) {
                return;
            }
            let x = e.clientX - this.view.volumeTotalBar.getBoundingClientRect().left;
            if (x > maxX) x = maxX;
            if (x <= 0){
                x = 0;
                this.props.isMuted = true;
                this.mute();
            } else if(this.props.isMuted) {
                this.props.isMuted = false;
                this.unMute();
            }
            let volume = x / maxX;
            this.props.volume = volume;
            this.setVolume(volume);
            this.menuController.updateVolume();
            this.menuController.waitForMouseStop();
            this.menuController.updateState();

        });

        this.eventBus.on('change-play-position', (e) => {
            e.stopPropagation();
            let newX = e.clientX - this.view.container.getBoundingClientRect().left - this.view.menuBarOffSetLeft.offsetWidth;
            let time = this.utils.xCoordinateToTime(this.view, newX)
            this.changeTime(time, e.isMoving);
            this.menuController.waitForMouseStop();
        });

        this.eventBus.on('play-pause-switch', (e) => {
            if(this.props.isReadingTerminated){
                this.props.currentTime = 0;
                this.props.isReadingTerminated = false;
                if (!this.hasEnoughBuffered()){
                    this.props.isLoading = true;
                    this.menuController.showLoadingState();
                    this.pause();
                    this.load();
                } else {
                    this.props.isLoading = false;
                    this.menuController.hideLoadingState();
                    this.play();
                }
            }
            else if(this.props.isPlaying){
                this.pause();
                this.menuController.showMenuBar();
                this.menuController.showTitleContainer();
                this.menuController.updateMenu();
            } else {
                if(!this.props.isLoading)
                    this.play();
            } 
            this.props.isPlaying = !this.props.isPlaying;
            this.menuController.updateState();
            this.menuController.waitForMouseStop();
            this.refreshBufferState();
            this.menuController.updateMenu();
        });

        this.eventBus.on('change-mute-state', (e) => {
            if(this.props.isMuted){
                this.unMute();
                if(this.props.pastVolume === 0){
                    this.props.volume = 1;
                } else {
                    this.props.volume = this.props.pastVolume;
                }
                this.setVolume(this.props.volume);
            }
            else{
                this.mute();
                this.props.pastVolume = this.props.volume;
                this.props.volume = 0;
            }
            this.menuController.updateVolume();   
            this.props.isMuted = !this.props.isMuted;
            this.menuController.waitForMouseStop();
            this.menuController.updateState();
        });

        this.eventBus.on('enough-buffered', () => {
            if((this.props.hasVideo && this.props.isVideoReady)
            || (this.props.hasAudio && this.props.isAudioReady && this.props.isSlideshowReady)
            || (this.props.hasAudio && !this.props.isAudioReady && this.props.isSlideshowReady && this.props.currentTime > this.audio.getDuration())//when audio stop before video
            || (!this.props.hasAudio && this.props.isSlideshowReady)){
                this.props.isLoading = false;
                this.menuController.hideLoadingState();
                if(this.props.isPlaying)
                    this.play();
                else
                    this.pause();
            }     
        });

        this.eventBus.on("previous", (e) => {
            let time = this.slideshow.getTimePreviousImage();
            this.changeTime(time);
            this.menuController.waitForMouseStop();
        });

        this.eventBus.on("next", (e) => {
            let time = this.slideshow.getTimeNextImage();
            this.changeTime(time);
            this.menuController.waitForMouseStop();
        });

        this.eventBus.on("full-screen", (e) => {
            this.fullscreenController.switchFullScreen();
            this.menuController.waitForMouseStop();
        });

        this.eventBus.on("full-screen-mode-changed", (e) => {
            this.props.isFullScreenActivated = !this.props.isFullScreenActivated;
            this.menuController.adaptMenuToPlayerWidth();
            this.menuController.updateProgressBarBuffered();
            
            if (this.props.hasVideo)
                this.video.displayVideo();
            else
                this.slideshow.displayImage();
                            
            if(this.props.hasAudio || this.props.hasVideo)
                this.menuController.hideVolumeSlider();
            this.menuController.waitForMouseStop();

        });


    this.changeTime = (time, freeze) => {
        if (time >= this.props.duration){
            time = this.props.duration;
            
        } else if (time < 0) {
            time = 0;
        }
        this.props.currentTime = time;
        if(this.props.currentTime >= this.props.duration){
            this.stop();
            this.props.isReadingTerminated = true;
            this.props.isPlaying = false;
        }
        if(this.props.isReadingTerminated && this.props.currentTime < this.props.duration){
            this.props.isReadingTerminated = false;
            this.props.isPlaying = true;
        }
        if (freeze){
            this.pause();
        } else {
            if (!this.hasEnoughBuffered()){
                this.props.isLoading = true;
                this.menuController.showLoadingState();
                this.pause();
                this.load();
            } else {
                this.props.isLoading = false;
                this.menuController.hideLoadingState();
                if(this.props.isPlaying)
                    this.play();
                else 
                    this.pause();
            }
        }
        this.refreshBufferState();
        this.menuController.updateMenu();
        this.menuController.updateState();
    }
    */
    synchronize = () => {
        if (this.props.currentTime >= this.props.duration) {
            this.stop();
            this.props.dispatch({ type: 'READING_TERMINATED' });
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
        //this.refreshBufferState();
    };
    /*

    this.refreshBufferState = () => {
        let timeRangeBuffered;
        if (this.props.hasVideo){
            timeRangeBuffered = this.video.timeRangeBuffered(this.props.currentTime);
        } else {
            if(this.props.hasAudio){
                let audioTimeRangeBuffered = this.audio.timeRangeBuffered(this.props.currentTime);
                let slideshowTimeRangeBuffered = this.slideshow.timeRangeBuffered(this.props.currentTime);
                if (this.audio.getDuration() < this.props.currentTime || audioTimeRangeBuffered === this.audio.getDuration()){
                    timeRangeBuffered = this.slideshow.timeRangeBuffered(this.props.currentTime);
                } else {
                    timeRangeBuffered = (audioTimeRangeBuffered < slideshowTimeRangeBuffered) ? audioTimeRangeBuffered : slideshowTimeRangeBuffered;
                }
            } else {
                timeRangeBuffered = this.slideshow.timeRangeBuffered(this.props.currentTime);
            }
        }
        this.menuController.updateProgressBarBuffered(timeRangeBuffered);
    };
    */
    /*hasEnoughBuffered = () => {
        if (this.props.hasVideo){
            return this.video.hasEnoughBuffered(this.props.currentTime);
        } else {
            if(this.props.hasAudio){
                if(this.props.currentTime < this.audio.getDuration()){
                    return (this.slideshow.hasEnoughBuffered(this.props.currentTime) && (this.audio.hasEnoughBuffered(this.props.currentTime)));
                }
                else
                    return this.slideshow.hasEnoughBuffered(this.props.currentTime);
            } else {
                return this.slideshow.hasEnoughBuffered(this.props.currentTime);
            }
        }
    };*/

    load = () => {
        if (this.props.hasVideo) {
            this.video.load(this.props.currentTime);
        } else {
            if (this.props.hasAudio)
                this.audio.load(this.props.currentTime);
            this.slideshow.load(this.props.currentTime);
        }
    };

    play = () => {
        if (this.props.currentTime >= this.props.duration) {
            this.stop();
            this.props.dispatch({ type: 'READING_TERMINATED' });
            return;
        }
        //this.refreshBufferState();
        //window.clearInterval(this.bufferTimer);
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
        //this.refreshBufferState();
        //this.bufferTimer = window.setInterval(this.refreshBufferState);
        if (this.props.hasVideo) {
            this.video.pause(this.props.currentTime);
        } else {
            if (this.props.hasAudio)
                this.audio.pause(this.props.currentTime);
            this.slideshow.pause(this.props.currentTime);
        }
    };

    changeTime = (time) => {
        if (this.props.currentTime >= this.props.duration) {
            this.stop();
            this.props.dispatch({ type: 'READING_TERMINATED' });
            return;
        }
        //this.refreshBufferState();
        //window.clearInterval(this.bufferTimer);
        window.clearInterval(this.timer);
        this.synchronize();
        this.timer = window.setInterval(this.synchronize, 20);
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
        //this.props.currentTime = this.props.duration;
        if (this.props.hasVideo) {
            this.video.stop();
        } else {
            if (this.props.hasAudio)
                this.audio.stop();
            this.slideshow.stop();
        }
    };

    mute = () => {
        if (this.props.hasVideo)
            this.video.mute();
        else if (this.props.hasAudio)
            this.audio.mute();
    };

    unMute = () => {
        if (this.props.hasVideo)
            this.video.unMute();
        else if (this.props.hasAudio)
            this.audio.unMute();
    };

    setVolume = (volume) => {
        if (this.props.hasVideo)
            this.video.setVolume(volume);
        else if (this.props.hasAudio)
            this.audio.setVolume(volume);
    };

    handleChannelsBufferStateChange = () => {
        if ((this.props.hasVideo && !this.props.isVideoReady)
            || ((this.props.hasAudio && !this.props.isAudioReady) /*|| this.props.currentTime > this.audio.getDuration()*/)
            || (this.props.hasSlideshow && !this.props.isSlideshowReady)) {

            this.props.dispatch({ type: 'LOADING' });
            console.log("isLoading");
            this.pause();
        } else {
            this.props.dispatch({ type: 'NOT_LOADING' });
            console.log("isNotLoading");
            if (this.props.isPlaying) this.play();
        }
    }

    componentDidMount = () => {
        this.handleChannelsBufferStateChange();
        this.setVolume(this.props.volume);
        if (this.props.isMuted) this.mute();
        else this.unMute();
    }

    componentDidUpdate = (prevprops) => {
        if (prevprops.isAudioReady !== this.props.isAudioReady
            || prevprops.isVideoReady !== this.props.isVideoReady
            || prevprops.isSlideshowReady !== this.props.isSlideshowReady) {
            this.handleChannelsBufferStateChange();
        }

        if (prevprops.isInitialized === false && this.props.isInitialized === true) {
            this.play();
        }

        if (prevprops.isPlaying !== this.props.isPlaying) {
            if (this.props.isPlaying) this.play();
            else this.pause();
        }

        if (prevprops.askedTime !== this.props.askedTime) {
            this.changeTime(this.props.askedTime);
            this.props.dispatch({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: this.props.askedTime } });
        }

        if (prevprops.volume !== this.props.volume) {
            this.setVolume(this.props.volume)
        }

        if (prevprops.isMuted !== this.props.isMuted) {
            if (this.props.isMuted) this.mute();
            else this.unMute();
        }

        if (prevprops.askNextImage !== this.props.askNextImage) {
            let time = this.slideshow.getTimeNextImage();
            this.changeTime(time);
            this.props.dispatch({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: time } });
        }

        if (prevprops.askPreviousImage !== this.props.askPreviousImage) {
            let time = this.slideshow.getTimePreviousImage();
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
    };
};

export default connect(mapStateToProps)(Mixer);

/*

Mixer play - pause - stop - changetime and synchronize channels

It also decide who update the buffer state.

Channels says when they can play or need to load, when need to load mixer pause the rest of the channels, when it gets ready it play agin all the channels.
*/