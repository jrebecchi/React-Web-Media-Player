import { isIE, isChrome } from './Utils';
const DEFAULT_WIDTH = 560 //560;
const DEFAULT_HEIGHT = 315 //315;
const DEFAULT_ALLOW_FULL_FRAME = true;
const DEFAULT_VOLUME = 1.0;
const DEFAULT_COLOR = 'rgb(96, 157, 255)';
const DEFAULT_VINYL_RPM = 33;

const initSlideshowPlayerState = (options) => {
    let state = {};
    state.hasAudio = false;
    state.hasSlideshow = true;
    state.hasVideo = false;
    state.hasVinyl = false;
    state.isSlideshowReady = false;
    state.imageDisplayed = null;
    if (options.slideshow.slice(-1)[0].endTime === undefined) {
        throw new Error("No time specified for slideshow");
    }
    state.duration = options.slideshow.slice(-1)[0].endTime;
    state.slideshow = options.slideshow;
    return state;
}

const initAudioSlideshowPlayerState = (options) => {
    let state = {};
    state.hasAudio = true;
    state.hasSlideshow = true;
    state.hasVideo = false;
    state.hasVinyl = false;
    state.isSlideshowReady = false;
    state.isAudioReady = false;
    state.imageDisplayed = null;
    if (options.slideshow.slice(-1)[0].endTime === undefined) {
        throw new Error("No time specified for slideshow");
    }
    state.duration = options.slideshow.slice(-1)[0].endTime;
    state.slideshow = options.slideshow;
    state.audio = options.audio;
    return state;
}

const initVideoPlayerState = (options) => {
    let state = {};
    state.hasVideo = true;
    state.hasAudio = false;
    state.hasSlideshow = false;
    state.hasVinyl = false;
    state.isVideoReady = false;
    state.duration = 0;
    state.video = options.video;
    return state;
}

const initAudioVinylPlayerState = (options) => {
    let state = {};
    state.hasAudio = true;
    state.hasSlideshow = false;
    state.hasVideo = false;
    state.hasVinyl = true;
    state.isAudioReady = false;
    state.isVinylReady = false;
    state.duration = 0;
    state.audio = options.audio;
    if (!options.vinyl.hasOwnProperty("img")) {
        throw new Error("Please pass an image link through the img property of the vinyl option");
    }
    if (options.vinyl.hasOwnProperty("rpm")) {
        state.rpm = options.vinyl.rpm;
    } else {
        state.rpm = DEFAULT_VINYL_RPM;
    }
    state.vinyl = options.vinyl.img;
    return state;
}

const initAudioPlayerState = (options) => {
    let state = {};
    state.hasAudio = true;
    state.hasSlideshow = false;
    state.hasVideo = false;
    state.hasVinyl = true;
    state.isAudioReady = false;
    state.isVinylReady = false;
    state.duration = 0;
    state.audio = options.audio;
    state.rpm = 0;
    state.vinyl = options.thumbnail;
    return state;
}

const getInitState = (options) => {
    if (options === undefined) {
        throw new Error("No options given to the player !");
    }
    let state = {};
    if (options.hasOwnProperty("video")
        && !options.hasOwnProperty("slideshow")
        && !options.hasOwnProperty("audio")
        && !options.hasOwnProperty("vinyl")) {
        state = initVideoPlayerState(options);
    } else if (!options.hasOwnProperty("video")
        && options.hasOwnProperty("slideshow")
        && options.hasOwnProperty("audio")
        && !options.hasOwnProperty("vinyl")) {
        state = initAudioSlideshowPlayerState(options);
    } else if (!options.hasOwnProperty("video")
        && options.hasOwnProperty("slideshow")
        && !options.hasOwnProperty("audio")
        && !options.hasOwnProperty("vinyl")) {
        state = initSlideshowPlayerState(options);
    } else if (!options.hasOwnProperty("video")
        && !options.hasOwnProperty("slideshow")
        && options.hasOwnProperty("audio")
        && options.hasOwnProperty("vinyl")) {
        state = initAudioVinylPlayerState(options);
    } else if (!options.hasOwnProperty("video")
        && !options.hasOwnProperty("slideshow")
        && options.hasOwnProperty("audio")
        && !options.hasOwnProperty("vinyl")) {
        state = initAudioPlayerState(options);
    } else {
        throw new Error("Combination impossible");
    }

    if (options.hasOwnProperty("height")) {
        state.height = options.height;
    } else {
        state.height = DEFAULT_HEIGHT;
    }
    if (options.hasOwnProperty("width")) {
        state.width = options.width;
    } else {
        state.width = DEFAULT_WIDTH;
    }
    if (options.hasOwnProperty("volume")) {
        state.volume = options.volume;
        state.pastVolume = options.volume;

    } else {
        state.volume = DEFAULT_VOLUME;
        state.pastVolume = DEFAULT_VOLUME;
    }
    if (options.hasOwnProperty("allowFullFrame")) {
        state.allowFullFrame = options.allowFullFrame;
    } else {
        state.allowFullFrame = DEFAULT_ALLOW_FULL_FRAME;
    }
    if (options.hasOwnProperty("currentTime")) {
        state.currentTime = options.currentTime;
    } else {
        state.currentTime = 0;
    }
    if (options.hasOwnProperty("logo")) {
        state.logo = options.logo;
    }
    if (options.hasOwnProperty("buttons")) {
        state.buttons = [];
        for (let i = 0; i < options.buttons.length; ++i) {
            if (!options.buttons[i].hasOwnProperty('img'))
                throw new Error("You need to specify the img property of the button 1");
            state.buttons.push(options.buttons[i])
        }
    }
    if (options.hasOwnProperty("color")) {
        state.color = options.color;
    } else {
        state.color = DEFAULT_COLOR;
    }
    if (options.hasOwnProperty("thumbnail")) {
        state.thumbnail = options.thumbnail;
    } else {
        throw new Error("You need to specify the thumbnail property");
    }
    if (options.hasOwnProperty("autoplay")) {
        //Autoplay of an audio track synchronized with a slideshow is blocked on Chrome-based browser 
        if (options.autoplay && isChrome() && state.hasSlideshow && state.hasAudio) {
            state.autoplay = false;
        } else {
            state.autoplay = options.autoplay;
        }
    } else {
        state.autoplay = false;
    }
    state.title = options.title;
    state.link = options.link;
    state.isLoading = true;
    state.isPlayerHighlighted = false;
    state.isInitialized = false;
    state.isLargePlayButtonHighlighted = false;
    state.isPlaying = false;
    state.isReadingTerminated = false;
    state.showVolumeSlider = true;
    state.isFullscreen = false;
    state.isFullscreenActivated = false;
    state.highlightProgressBar = false;
    state.allowUnhighlightProgressBar = true;
    state.volumeSliderLeftMargin = "calculateMe!";
    state.allowMouseLeaveVolumeSlider = true;
    state.showMenus = false;
    state.allowMenuHiding = true;
    state.showCursor = true;
    state.timeLastUserAction = new Date();
    state.askTime = 0;
    state.askNextImage = null;
    state.askPreviousImage = null;
    state.videoHeight = null;
    state.videoWidth = null;
    state.timeRangeBuffered = 0;
    state.channelsWait = false;
    return state;
}

export { getInitState }