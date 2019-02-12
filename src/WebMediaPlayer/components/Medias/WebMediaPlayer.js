define([
    './model/SlideshowModel',
    './controller/FullscreenController',
    './controller/MenuController',
    './controller/AudioController',
    './controller/VideoController',
    './controller/SlideshowController',
    './service/EventHandler',
    './service/Utils',
    './view/View',
    '../lib/EventBus',
], function (SlideshowModel, FullscreenController, MenuController, AudioController, VideoController,SlideshowController, EventHandler, Utils, View, EventBus) {
    const WebMediaPlayer =  function(options){

        const  MAX_DIFFERENCE_AUDIO_SLIDESHOW = 0.1; //in seconds
        
        const init = (options) => {
            this.state = new SlideshowModel(options);
            this.eventBus = new EventBus();
            this.utils = new Utils(this);
            this.view = new View(this);
            this.menuController = new MenuController(this);
            this.fullscreenController = new FullscreenController(this)
            if (this.state.hasVideo){
                this.VideoController = new VideoController(this);
            } else {
                if (this.state.hasAudio)
                    this.AudioController = new AudioController(this);
                this.SlideshowController = new SlideshowController(this);
            }                
            this.eventHandler = new EventHandler(this);
        }

        const addEventListener = () => {
            
            this.eventBus.on("init", () => {
                this.state.isInitialized = true;
                this.menuController.fadeLargePlayButton();
                this.menuController.showLoadingState();
                this.menuController.showMenuBar();                
                this.state.currentTime = 0;
                this.state.isInitialized = true;
                this.state.isLoading = true;
                this.state.isPlaying = true;
                this.refreshBufferState();
                if(this.state.hasAudio || this.state.hasVideo){
                    this.menuController.updateVolume();
                    this.menuController.hideVolumeSlider();
                }
                this.load();
                this.menuController.waitForMouseStop();
                this.menuController.updateState();
    
            });

            this.eventBus.on("wait-for-mouse-stop", (e) => {
                this.menuController.waitForMouseStop();
            });

            this.eventBus.on("update-past-volume-state", () => {
                this.state.pastVolume = this.state.volume;
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
                    this.state.isMuted = true;
                    this.mute();
                } else if(this.state.isMuted) {
                    this.state.isMuted = false;
                    this.unMute();
                }
                let volume = x / maxX;
                this.state.volume = volume;
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
                if(this.state.isReadingTerminated){
                    this.state.currentTime = 0;
                    this.state.isReadingTerminated = false;
                    if (!this.hasEnoughBuffered()){
                        this.state.isLoading = true;
                        this.menuController.showLoadingState();
                        this.pause();
                        this.load();
                    } else {
                        this.state.isLoading = false;
                        this.menuController.hideLoadingState();
                        this.play();
                    }
                }
                else if(this.state.isPlaying){
                    this.pause();
                    this.menuController.showMenuBar();
                    this.menuController.showTitleContainer();
                    this.menuController.updateMenu();
                } else {
                    if(!this.state.isLoading)
                        this.play();
                } 
                this.state.isPlaying = !this.state.isPlaying;
                this.menuController.updateState();
                this.menuController.waitForMouseStop();
                this.refreshBufferState();
                this.menuController.updateMenu();
            });

            this.eventBus.on('change-mute-state', (e) => {
                if(this.state.isMuted){
                    this.unMute();
                    if(this.state.pastVolume === 0){
                        this.state.volume = 1;
                    } else {
                        this.state.volume = this.state.pastVolume;
                    }
                    this.setVolume(this.state.volume);
                }
                else{
                    this.mute();
                    this.state.pastVolume = this.state.volume;
                    this.state.volume = 0;
                }
                this.menuController.updateVolume();   
                this.state.isMuted = !this.state.isMuted;
                this.menuController.waitForMouseStop();
                this.menuController.updateState();
            });

            this.eventBus.on('enough-buffered', () => {
                if((this.state.hasVideo && this.state.isVideoReady)
                || (this.state.hasAudio && this.state.isAudioReady && this.state.isSlideshowReady)
                || (this.state.hasAudio && !this.state.isAudioReady && this.state.isSlideshowReady && this.state.currentTime > this.AudioController.getTimeLength())//when audio stop before video
                || (!this.state.hasAudio && this.state.isSlideshowReady)){
                    this.state.isLoading = false;
                    this.menuController.hideLoadingState();
                    if(this.state.isPlaying)
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
                this.state.isFullScreenActivated = !this.state.isFullScreenActivated;
                this.menuController.adaptMenuToPlayerWidth();
                this.menuController.updateProgressBarBuffered();
                
                if (this.state.hasVideo)
                    this.VideoController.displayVideo();
                else
                    this.SlideshowController.displayImage();
                                
                if(this.state.hasAudio || this.state.hasVideo)
                    this.menuController.hideVolumeSlider();
                this.menuController.waitForMouseStop();

            });

            this.eventBus.on("mouse-enter-player", (e) => {
                this.menuController.coloredLargePlayButton();
                this.menuController.showMenuBar();
                this.menuController.showTitleContainer();
                this.menuController.waitForMouseStop();
            });
            
            this.eventBus.on("mouse-leave-player", (e) => {
                this.menuController.regularLargePlayButton();
                this.menuController.hideMenuBar();
                this.menuController.hideTitleContainer();
            });

            this.eventBus.on("mouse-enter-progress-bar", (x) => {
                this.menuController.highlightProgressBar(x);
                this.menuController.waitForMouseStop();

            });
            this.eventBus.on("mouse-leave-progress-bar", (e) => {
                this.menuController.unhighlightProgressBar(e);
            });
            this.eventBus.on("mouse-down-scrubber-button", (e) => {
                this.menuController.animateScrubberButton();
                this.menuController.waitForMouseStop();

            });
            this.eventBus.on("mouse-down-volume-slider", (e) => {
                this.menuController.animateVolumeScrubberButton();
                this.menuController.waitForMouseStop();

            });
            this.eventBus.on("mouse-move-player", (e) => {
                this.menuController.waitForMouseStop();
            });

            this.eventBus.on("adapt-menu-to-player-width", (e) => {
                this.menuController.adaptMenuToPlayerWidth();
                this.menuController.waitForMouseStop();
            });

            this.eventBus.on("display-image", (e) =>{
                this.SlideshowController.displayImage();
                this.menuController.waitForMouseStop();
            });

            this.eventBus.on("update-progress-bar-buffered", (e) => {
                this.menuController.updateProgressBarBuffered();
            });
            
            this.eventBus.on("show-replay-button",(e) => {
                this.menuController.showReplayButton();
            });

            this.eventBus.on("update-time-length", (timeLength) => {
                this.state.timeLength = timeLength;
                this.menuController.updateTimeLength();
            });

            this.eventBus.on("show-volume-slider", (e) => {
                this.menuController.showVolumeSlider();
            });

            this.eventBus.on("hide-volume-slider", (e) => {
                if(this.state.hasAudio || this.state.hasVideo)
                    this.menuController.hideVolumeSlider();
            });
            
            this.eventBus.on("show-menu-bar", (e) => {
                this.menuController.showMenuBar();
            });
            
            this.eventBus.on("show-title-container", (e) => {
                this.menuController.showTitleContainer();
            });
            
            this.eventBus.on("hide-menu-when-user-inactive", (e) => {
                this.menuController.waitForMouseStop();
            });
            
            this.eventBus.on("update-view", (e) => {
                this.synchronize();
            });  
        };

        this.changeTime = (time, freeze) => {
            if (time >= this.state.timeLength){
                time = this.state.timeLength;
                
            } else if (time < 0) {
                time = 0;
            }
            this.state.currentTime = time;
            if(this.state.currentTime >= this.state.timeLength){
                this.stop();
                this.state.isReadingTerminated = true;
                this.state.isPlaying = false;
            }
            if(this.state.isReadingTerminated && this.state.currentTime < this.state.timeLength){
                this.state.isReadingTerminated = false;
                this.state.isPlaying = true;
            }
            if (freeze){
                this.pause();
            } else {
                if (!this.hasEnoughBuffered()){
                    this.state.isLoading = true;
                    this.menuController.showLoadingState();
                    this.pause();
                    this.load();
                } else {
                    this.state.isLoading = false;
                    this.menuController.hideLoadingState();
                    if(this.state.isPlaying)
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
            if (this.state.hasVideo){
                this.state.currentTime = this.VideoController.getCurrentTime();
            } else {
                if(this.state.hasAudio){
                    if(this.AudioController.getTimeLength() > this.state.currentTime){
                        this.state.currentTime = this.AudioController.getCurrentTime();
                        let diff = Math.abs(this.AudioController.getCurrentTime() - this.SlideshowController.getCurrentTime());
                        if (diff > MAX_DIFFERENCE_AUDIO_SLIDESHOW)//re-synchronize audio and slideshow 
                            this.SlideshowController.play(this.AudioController.getCurrentTime());
                    } else{
                        this.state.currentTime = this.SlideshowController.getCurrentTime();
                        this.AudioController.pause()
                    }
                } else {
                    this.state.currentTime = this.SlideshowController.getCurrentTime();
                }
            }

            if(this.state.currentTime >= this.state.timeLength){
                this.stop();
                this.state.isReadingTerminated = true;
                this.state.isPlaying = false;
            }
            else if(!this.hasEnoughBuffered() && !this.state.isLoading){
                this.state.isLoading = true;
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
            if (this.state.hasVideo){
                timeRangeBuffered = this.VideoController.timeRangeBuffered(this.state.currentTime);
            } else {
                if(this.state.hasAudio){
                    let audioTimeRangeBuffered = this.AudioController.timeRangeBuffered(this.state.currentTime);
                    let slideshowTimeRangeBuffered = this.SlideshowController.timeRangeBuffered(this.state.currentTime);
                    if (this.AudioController.getTimeLength() < this.state.currentTime || audioTimeRangeBuffered === this.AudioController.getTimeLength()){
                        timeRangeBuffered = this.SlideshowController.timeRangeBuffered(this.state.currentTime);
                    } else {
                        timeRangeBuffered = (audioTimeRangeBuffered < slideshowTimeRangeBuffered) ? audioTimeRangeBuffered : slideshowTimeRangeBuffered;
                    }
                } else {
                    timeRangeBuffered = this.SlideshowController.timeRangeBuffered(this.state.currentTime);
                }
            }
            this.menuController.updateProgressBarBuffered(timeRangeBuffered);
        };

        this.hasEnoughBuffered = () => {
            if (this.state.hasVideo){
                return this.VideoController.hasEnoughBuffered(this.state.currentTime);
            } else {
                if(this.state.hasAudio){
                    if(this.state.currentTime < this.AudioController.getTimeLength()){
                        return (this.SlideshowController.hasEnoughBuffered(this.state.currentTime) && (this.AudioController.hasEnoughBuffered(this.state.currentTime)));
                    }
                    else
                        return this.SlideshowController.hasEnoughBuffered(this.state.currentTime);
                } else {
                    return this.SlideshowController.hasEnoughBuffered(this.state.currentTime);
                }
            }
        };

        this.load = () => {
            if (this.state.hasVideo){
                this.VideoController.load(this.state.currentTime);
            } else {
                if (this.state.hasAudio)
                    this.AudioController.load(this.state.currentTime);
                this.SlideshowController.load(this.state.currentTime);
            }
        };

        this.play = () => {
            if(this.state.currentTime >= this.state.timeLength){
                this.stop();
                this.state.isReadingTerminated = true;
                return;
            }
            this.refreshBufferState();
            window.clearInterval(this.bufferTimer);
            window.clearInterval(this.timer);
            this.timer = window.setInterval(this.synchronize, 20);
            if (this.state.hasVideo){
                this.VideoController.play(this.state.currentTime);
            } else {
                if (this.state.hasAudio)
                    if(this.state.currentTime < this.AudioController.getTimeLength())
                        this.AudioController.play(this.state.currentTime);
                this.SlideshowController.play(this.state.currentTime);
            }
        };

        this.pause = () => {
            window.clearInterval(this.timer);
            this.refreshBufferState();
            this.bufferTimer = window.setInterval(this.refreshBufferState);
            if (this.state.hasVideo){
                this.VideoController.pause(this.state.currentTime);
            } else {
                if (this.state.hasAudio)
                    this.AudioController.pause(this.state.currentTime);
                this.SlideshowController.pause(this.state.currentTime);
            }
        };

        this.stop = () => {
            window.clearInterval(this.timer);
            this.state.currentTime = this.state.timeLength;
            if (this.state.hasVideo){
                this.VideoController.stop();
            } else {
                if (this.state.hasAudio)
                    this.AudioController.stop();
                this.SlideshowController.stop();
            }
        };

        this.mute = () => {
            if (this.state.hasVideo)
                this.VideoController.mute();
            else if (this.state.hasAudio)
                this.AudioController.mute();
        };


        this.unMute = () => {
            if (this.state.hasVideo)
                this.VideoController.unMute();
            else if (this.state.hasAudio)
                this.AudioController.unMute();
        };

        this.setVolume = (volume) => {
            if (this.state.hasVideo)
                this.VideoController.setVolume(volume);
            else if (this.state.hasAudio)
                this.AudioController.setVolume(volume);
        };
        
        init(options);
        addEventListener();
        console.log(this);

    }

    return WebMediaPlayer ;
});