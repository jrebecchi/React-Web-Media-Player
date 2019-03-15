import highlightPlayer from '../actions/HighlightPlayer';
import unhighlightPlayer from '../actions/UnhighlightPlayer';
import initializePlayer from '../actions/InitializePlayer';
import showVolumeSlider from '../actions/ShowVolumeSlider';
import hideVolumeSlider from '../actions/HideVolumeSlider';
import switchFullscreen from '../actions/SwitchFullscreen';
import adaptPlayerToFullscreen from '../actions/AdaptPlayerToFullscreen';
import adaptPlayerToNonFullscreen from '../actions/AdaptPlayerToNonFullscreen';
import updateVolume from '../actions/UpdateVolume';
import saveActualVolumeAsPastVolume from '../actions/SaveActualVolumeAsPastVolume';
import updateVolumeSliderLeftMargin from '../actions/UpdateVolumeSliderLeftMargin';
import preventMouseLeaveVolumeSlider from '../actions/PreventMouseLeaveVolumeSlider';
import allowMouseLeaveVolumeSlider from '../actions/AllowMouseLeaveVolumeSlider';
import hightLightProgressBar from '../actions/HighlightProgressBar';
import unhightLightProgressBar from '../actions/UnhighlightProgressBar';
import readingNotTerminated from '../actions/ReadingNotTerminated';
import readingTerminated from '../actions/ReadingTerminated';
import updateCurrentTime from '../actions/UpdateCurrentTime';
import preventUnhighlightProgressBar from '../actions/PreventUnhighlightProgressBar';
import allowUnhighlightProgressBar from '../actions/AllowUnhighlightProgressBar';
import play from '../actions/Play';
import pause from '../actions/Pause';
import showMenus from '../actions/ShowMenus';
import hideMenus from '../actions/HideMenus';
import updateTimeLastUserAction from '../actions/UpdateTimeLastUserAction';
import showCursor from '../actions/ShowCursor';
import hideCursor from '../actions/HideCursor';
import updateDuration from '../actions/UpdateDuration';
import audioNotReady from '../actions/AudioNotReady';
import audioReady from '../actions/AudioReady';
import videoNotReady from '../actions/VideoNotReady';
import videoReady from '../actions/VideoReady';
import slideshowNotReady from '../actions/SlideshowNotReady';
import slideshowReady from '../actions/SlideshowReady';
import addImage from '../actions/AddImage';
import loading from '../actions/Loading';
import notLoading from '../actions/NotLoading';
import updateAskedTime from '../actions/UpdateAskedTime';
import updateImageDisplayed from '../actions/UpdateImageDisplayed';
import askPreviousImage from '../actions/AskPreviousImage';
import askNextImage from '../actions/AskNextImage';
import updateVideoWidth from '../actions/UpdateVideoWidth';
import updateVideoHeight from '../actions/UpdateVideoHeight';
import preventMenuHiding from '../actions/PreventMenuHiding';
import allowMenuHiding from '../actions/AllowMenuHiding';
import updateTimeRangeBuffered from '../actions/UpdateTimeRangeBuffered';
import channelsWait from '../actions/ChannelsWait';
import channelsContinue from '../actions/ChannelsContinue';
import vinylReady from '../actions/VinylReady';

const reducer = (state, action) => {
    console.log(action.type);
    if (action === undefined) {
        return state;
    }
    switch (action.type) {
        case "VINYL_IS_READY":
            return vinylReady(state);
        case "CHANNELS_CONTINUE":
            return channelsContinue(state);
        case "CHANNELS_WAIT":
            return channelsWait(state);
        case "UPDATE_TIME_RANGE_BUFFERED":
            return updateTimeRangeBuffered(state, action);
        case "PREVENT_MENU_HIDING":
            return preventMenuHiding(state);
        case "ALLOW_MENU_HIDING":
            return allowMenuHiding(state);
        case "UPDATE_VIDEO_WIDTH":
            return updateVideoWidth(state, action);
        case "UPDATE_VIDEO_HEIGHT":
            return updateVideoHeight(state, action);
        case "ASK_NEXT_IMAGE":
            return askNextImage(state);
        case "ASK_PREVIOUS_IMAGE":
            return askPreviousImage(state);
        case 'UPDATE_IMAGE_DISPLAYED':
            return updateImageDisplayed(state, action);
        case 'UPDATE_ASKED_TIME':
            return updateAskedTime(state, action);
        case 'NOT_LOADING':
            return notLoading(state, action);
        case 'LOADING':
            return loading(state, action);
        case 'ADD_IMAGE':
            return addImage(state, action);
        case 'AUDIO_IS_NOT_READY':
            return audioNotReady(state);
        case 'AUDIO_IS_READY':
            return audioReady(state);
        case 'VIDEO_IS_NOT_READY':
            console.log("nott readdyyyyyyyyyyy");
            return videoNotReady(state);
        case 'VIDEO_IS_READY':
            return videoReady(state);
        case 'SLIDESHOW_IS_NOT_READY':
            return slideshowNotReady(state);
        case 'SLIDESHOW_IS_READY':
            return slideshowReady(state);
        case 'UPDATE_DURATION':
            return updateDuration(state, action);
        case 'SHOW_CURSOR':
            return showCursor(state);
        case 'HIDE_CURSOR':
            return hideCursor(state);
        case 'UPDATE_CURRENT_TIME':   
            return updateCurrentTime(state, action);
        case 'SHOW_MENUS':
            return showMenus(state);
        case 'HIDE_MENUS':
            return hideMenus(state);
        case 'USER_ACTIVE':
            return updateTimeLastUserAction(state);
        case 'PLAY':
            return play(state);
        case 'PAUSE':
            return pause(state);
        case 'ALLOW_UNHIGHLIGHT_PROGRESS_BAR':
            return allowUnhighlightProgressBar(state);
        case 'PREVENT_UNHIGHLIGHT_PROGRESS_BAR':
            return preventUnhighlightProgressBar(state);
        case 'READING_TERMINATED':
            return readingTerminated(state);
        case 'READING_NOT_TERMINATED':
            return readingNotTerminated(state);
        case 'HIGHTLIGHT_PROGRESS_BAR':
            return hightLightProgressBar(state);
        case 'UNHIGHTLIGHT_PROGRESS_BAR':
            return unhightLightProgressBar(state);
        case 'ALLOW_MOUSE_LEAVE_VOLUME_SLIDER':
            return allowMouseLeaveVolumeSlider(state);
        case 'PREVENT_MOUSE_LEAVE_VOLUME_SLIDER':
            return preventMouseLeaveVolumeSlider(state);
        case 'UPDATE_VOLUME_SLIDER_LEFT_MARGIN':
            return updateVolumeSliderLeftMargin(state, action);
        case 'SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME':
            return saveActualVolumeAsPastVolume(state);
        case 'UPDATE_VOLUME':
            return updateVolume(state, action);
        case 'FULL_SCREEN_ENABLED':
            return adaptPlayerToFullscreen(state);
        case 'FULL_SCREEN_DISABLED':
            return adaptPlayerToNonFullscreen(state);
        case 'SWITCH_FULLSCREEN_STATE':
            return switchFullscreen(state);
        case 'SHOW_VOLUME_SLIDER':
            return showVolumeSlider(state);
        case 'HIDE_VOLUME_SLIDER':
            return hideVolumeSlider(state);
        case 'HIGHLIGHT_PLAYER':
            return highlightPlayer(state);
        case 'UNHIGHLIGHT_PLAYER':
            return unhighlightPlayer(state);
        case 'INITIALIZE_PLAYER':
            return initializePlayer(state);
        case 'INIT_STATE':
            return action.payload.state;
        default:
            return state;
    }
};

export default reducer;