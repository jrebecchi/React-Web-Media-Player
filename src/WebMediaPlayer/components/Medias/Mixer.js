import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from "./Channels/Video";
import Audio from "./Channels/Audio";
import Slideshow from "./Channels/Slideshow";
//const  MAX_DIFFERENCE_AUDIO_SLIDESHOW = 0.1; //in seconds

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
            this.VideoController = new VideoController(this);
        } else {
            if (this.props.hasAudio)
                this.AudioController = new AudioController(this);
            this.SlideshowController = new SlideshowController(this);
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
            || (this.props.hasAudio && !this.props.isAudioReady && this.props.isSlideshowReady && this.props.currentTime > this.AudioController.getTimeLength())//when audio stop before video
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
            let time = this.SlideshowController.getTimePreviousImage();
            this.changeTime(time);
            this.menuController.waitForMouseStop();
        });

        this.eventBus.on("next", (e) => {
            let time = this.SlideshowController.getTimeNextImage();
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
                this.VideoController.displayVideo();
            else
                this.SlideshowController.displayImage();
                            
            if(this.props.hasAudio || this.props.hasVideo)
                this.menuController.hideVolumeSlider();
            this.menuController.waitForMouseStop();

        });


    this.changeTime = (time, freeze) => {
        if (time >= this.props.timeLength){
            time = this.props.timeLength;
            
        } else if (time < 0) {
            time = 0;
        }
        this.props.currentTime = time;
        if(this.props.currentTime >= this.props.timeLength){
            this.stop();
            this.props.isReadingTerminated = true;
            this.props.isPlaying = false;
        }
        if(this.props.isReadingTerminated && this.props.currentTime < this.props.timeLength){
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

    this.synchronize = () => {
        if (this.props.hasVideo){
            this.props.currentTime = this.VideoController.getCurrentTime();
        } else {
            if(this.props.hasAudio){
                if(this.AudioController.getTimeLength() > this.props.currentTime){
                    this.props.currentTime = this.AudioController.getCurrentTime();
                    let diff = Math.abs(this.AudioController.getCurrentTime() - this.SlideshowController.getCurrentTime());
                    if (diff > MAX_DIFFERENCE_AUDIO_SLIDESHOW)//re-synchronize audio and slideshow 
                        this.SlideshowController.play(this.AudioController.getCurrentTime());
                } else{
                    this.props.currentTime = this.SlideshowController.getCurrentTime();
                    this.AudioController.pause()
                }
            } else {
                this.props.currentTime = this.SlideshowController.getCurrentTime();
            }
        }

        if(this.props.currentTime >= this.props.timeLength){
            this.stop();
            this.props.isReadingTerminated = true;
            this.props.isPlaying = false;
        }
        else if(!this.hasEnoughBuffered() && !this.props.isLoading){
            this.props.isLoading = true;
            this.menuController.showLoadingState();
            this.pause();
            this.load();
        }

        this.refreshBufferState();
        this.menuController.updateMenu();
        this.menuController.updateState();
    };

    this.refreshBufferState = () => {
        let timeRangeBuffered;
        if (this.props.hasVideo){
            timeRangeBuffered = this.VideoController.timeRangeBuffered(this.props.currentTime);
        } else {
            if(this.props.hasAudio){
                let audioTimeRangeBuffered = this.AudioController.timeRangeBuffered(this.props.currentTime);
                let slideshowTimeRangeBuffered = this.SlideshowController.timeRangeBuffered(this.props.currentTime);
                if (this.AudioController.getTimeLength() < this.props.currentTime || audioTimeRangeBuffered === this.AudioController.getTimeLength()){
                    timeRangeBuffered = this.SlideshowController.timeRangeBuffered(this.props.currentTime);
                } else {
                    timeRangeBuffered = (audioTimeRangeBuffered < slideshowTimeRangeBuffered) ? audioTimeRangeBuffered : slideshowTimeRangeBuffered;
                }
            } else {
                timeRangeBuffered = this.SlideshowController.timeRangeBuffered(this.props.currentTime);
            }
        }
        this.menuController.updateProgressBarBuffered(timeRangeBuffered);
    };

    this.hasEnoughBuffered = () => {
        if (this.props.hasVideo){
            return this.VideoController.hasEnoughBuffered(this.props.currentTime);
        } else {
            if(this.props.hasAudio){
                if(this.props.currentTime < this.AudioController.getTimeLength()){
                    return (this.SlideshowController.hasEnoughBuffered(this.props.currentTime) && (this.AudioController.hasEnoughBuffered(this.props.currentTime)));
                }
                else
                    return this.SlideshowController.hasEnoughBuffered(this.props.currentTime);
            } else {
                return this.SlideshowController.hasEnoughBuffered(this.props.currentTime);
            }
        }
    };
    */
    load = () => {
        if (this.props.hasVideo){
            this.video.load(this.props.currentTime);
        } else {
            if (this.props.hasAudio)
                this.audio.load(this.props.currentTime);
            this.slideshow.load(this.props.currentTime);
        }
    };
    /*
    this.play = () => {
        if(this.props.currentTime >= this.props.timeLength){
            this.stop();
            this.props.isReadingTerminated = true;
            return;
        }
        this.refreshBufferState();
        window.clearInterval(this.bufferTimer);
        window.clearInterval(this.timer);
        this.timer = window.setInterval(this.synchronize, 20);
        if (this.props.hasVideo){
            this.VideoController.play(this.props.currentTime);
        } else {
            if (this.props.hasAudio)
                if(this.props.currentTime < this.AudioController.getTimeLength())
                    this.AudioController.play(this.props.currentTime);
            this.SlideshowController.play(this.props.currentTime);
        }
    };

    this.pause = () => {
        window.clearInterval(this.timer);
        this.refreshBufferState();
        this.bufferTimer = window.setInterval(this.refreshBufferState);
        if (this.props.hasVideo){
            this.VideoController.pause(this.props.currentTime);
        } else {
            if (this.props.hasAudio)
                this.AudioController.pause(this.props.currentTime);
            this.SlideshowController.pause(this.props.currentTime);
        }
    };

    this.stop = () => {
        window.clearInterval(this.timer);
        this.props.currentTime = this.props.timeLength;
        if (this.props.hasVideo){
            this.VideoController.stop();
        } else {
            if (this.props.hasAudio)
                this.AudioController.stop();
            this.SlideshowController.stop();
        }
    };

    this.mute = () => {
        if (this.props.hasVideo)
            this.VideoController.mute();
        else if (this.props.hasAudio)
            this.AudioController.mute();
    };


    this.unMute = () => {
        if (this.props.hasVideo)
            this.VideoController.unMute();
        else if (this.props.hasAudio)
            this.AudioController.unMute();
    };

    this.setVolume = (volume) => {
        if (this.props.hasVideo)
            this.VideoController.setVolume(volume);
        else if (this.props.hasAudio)
            this.AudioController.setVolume(volume);
    };
    */

    componentDidUpdate = (prevprops) => {
        if (prevprops.isInitialized === false && this.props.isInitialized === true) {
            this.load();
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
        hasVideo: state.hasVideo,
        hasAudio: state.hasAudio,
        hasSlideshow: state.hasSlideshow,
        isInitialized: state.isInitialized,
        currentTime: state.currentTime,
        isPlaying: state.isPlaying
    };
};

export default connect(mapStateToProps)(Mixer);