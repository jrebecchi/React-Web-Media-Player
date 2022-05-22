import ReactWebMediaPlayer from "../ReactWebMediaPlayer";
import { IState } from "../state/types/IState";

const DEFAULT_WIDTH = 560;
const DEFAULT_HEIGHT = 315;
const DEFAULT_ALLOW_FULL_FRAME = true;
const DEFAULT_VOLUME = 1.0;
const DEFAULT_COLOR = 'rgb(96, 157, 255)';
const DEFAULT_VINYL_RPM = 33;


const initSlideshowPlayerState = (options: ReactWebMediaPlayer.Props) => {
    if (options.slideshow === undefined) {
        throw new Error("slideshow is undefined");
    }
    if (options.slideshow && options.slideshow.slice(-1)[0].endTime === undefined) {
        throw new Error("No time specified for slideshow");
    }
    return {
        hasAudio: false,
        hasSlideshow: true,
        hasVideo: false,
        hasVinyl: false,
        isSlideshowReady: false,
        imageDisplayed: null,
        duration: options.slideshow.slice(-1)[0].endTime,
        slideshow: options.slideshow
    }
};

const initAudioSlideshowPlayerState = (options: ReactWebMediaPlayer.Props) => {
    if (options.slideshow === undefined) {
        throw new Error("slideshow is undefined");
    }
    if (options.audio === undefined) {
        throw new Error("audio is undefined");
    }
    if (options.slideshow && options.slideshow.slice(-1)[0].endTime === undefined) {
        throw new Error("No time specified for slideshow");
    }
    return {
        hasAudio: true,
        hasSlideshow: true,
        hasVideo: false,
        hasVinyl: false,
        isSlideshowReady: false,
        isAudioReady: false,
        imageDisplayed: null,
        duration: options.slideshow.slice(-1)[0].endTime,
        slideshow: options.slideshow,
        audio: options.audio,
    }
};

const initVideoPlayerState = (options: ReactWebMediaPlayer.Props) => {
    if (options.video === undefined) {
        throw new Error("video is undefined");
    }
    return {
        hasVideo: true,
        hasAudio: false,
        hasSlideshow: false,
        hasVinyl: false,
        isVideoReady: false,
        duration: 0,
        video: options.video,
    }
};

const initAudioVinylPlayerState = (options: ReactWebMediaPlayer.Props) => {
    if (options.vinyl === undefined) {
        throw new Error("vinyl is undefined");
    }
    if (!options.vinyl.hasOwnProperty("img")) {
        throw new Error("Please pass an image link through the img property of the vinyl option");
    }
    return {
        hasAudio: true,
        hasSlideshow: false,
        hasVideo: false,
        hasVinyl: true,
        isAudioReady: false,
        isVinylReady: false,
        duration: 0,
        audio: options.audio,
        rpm: options.vinyl.hasOwnProperty("rpm") ? options.vinyl.rpm : DEFAULT_VINYL_RPM,
        vinyl: options.vinyl.img,
    }
}

const initAudioPlayerState = (options: ReactWebMediaPlayer.Props) => {
    return {
        hasAudio: true,
        hasSlideshow: false,
        hasVideo: false,
        hasVinyl: true,
        isAudioReady: false,
        isVinylReady: false,
        duration: 0,
        audio: options.audio,
        rpm: 0,
        vinyl: options.thumbnail,
    }
}

const getInitState = (options: ReactWebMediaPlayer.Props) => {
    if (options === undefined) {
        throw new Error("No options given to the player !");
    }
    if (options.buttons !== undefined) {
        for (let i = 0; i < options.buttons.length; ++i) {
            if (!options.buttons[i].hasOwnProperty('img'))
                throw new Error("You need to specify the img property of each button");
        }
    }
    const partialState = {
        height: options.height !== undefined ? options.height : DEFAULT_HEIGHT,
        width: options.width !== undefined ? options.width : DEFAULT_WIDTH,
        volume: options.volume !== undefined ? options.volume : DEFAULT_VOLUME,
        pastVolume: options.volume !== undefined ? options.volume : DEFAULT_VOLUME,
        allowFullFrame: options.allowFullFrame !== undefined ? options.allowFullFrame : DEFAULT_ALLOW_FULL_FRAME,
        currentTime: options.currentTime !== undefined ? options.currentTime : 0.0,
        logo: options.logo,
        buttons: options.buttons !== undefined ? options.buttons : [],
        color: options.color !== undefined ? options.color : DEFAULT_COLOR,
        thumbnail: options.thumbnail,
        muted: options.muted !== undefined ? options.muted : false,
        autoplay: options.autoplay !== undefined ? options.autoplay : false,
        style: options.style !== undefined ? options.style : {},
        id: options.id,
        isTestEnvironment: options.isTestEnvironment !== undefined ? options.isTestEnvironment : false,
        initTime: new Date(),
        title: options.title,
        link: options.titleHref,
        isLoading: true,
        isPlayerHighlighted: false,
        isInitialized: false,
        isLargePlayButtonHighlighted: false,
        isPlaying: false,
        isReadingTerminated: false,
        showVolumeSlider: true,
        isFullscreen: false,
        isFullscreenActivated: false,
        highlightProgressBar: false,
        allowUnhighlightProgressBar: true,
        volumeSliderLeftMargin: "calculateMe!",
        allowMouseLeaveVolumeSlider: true,
        showMenus: false,
        allowMenuHiding: true,
        showCursor: true,
        timeLastUserAction: new Date(),
        askTime: 0,
        askNextImage: null,
        askPreviousImage: null,
        videoHeight: null,
        videoWidth: null,
        timeRangeBuffered: 0,
        channelsWait: false,
    }
    let state: IState;
    if (options.hasOwnProperty("video")
        && !options.hasOwnProperty("slideshow")
        && !options.hasOwnProperty("audio")
        && !options.hasOwnProperty("vinyl")) {
        state = { ...initVideoPlayerState(options), ...partialState };
    } else if (!options.hasOwnProperty("video")
        && options.hasOwnProperty("slideshow")
        && options.hasOwnProperty("audio")
        && !options.hasOwnProperty("vinyl")) {
        state = { ...initAudioSlideshowPlayerState(options), ...partialState };
    } else if (!options.hasOwnProperty("video")
        && options.hasOwnProperty("slideshow")
        && !options.hasOwnProperty("audio")
        && !options.hasOwnProperty("vinyl")) {
        state = { ...initSlideshowPlayerState(options), ...partialState };
    } else if (!options.hasOwnProperty("video")
        && !options.hasOwnProperty("slideshow")
        && options.hasOwnProperty("audio")
        && options.hasOwnProperty("vinyl")) {
        state = { ...initAudioVinylPlayerState(options), ...partialState };
    } else if (!options.hasOwnProperty("video")
        && !options.hasOwnProperty("slideshow")
        && options.hasOwnProperty("audio")
        && !options.hasOwnProperty("vinyl")) {
        state = { ...initAudioPlayerState(options), ...partialState };
    } else {
        throw new Error("Combination impossible");
    }


    return state;
}

export { getInitState }