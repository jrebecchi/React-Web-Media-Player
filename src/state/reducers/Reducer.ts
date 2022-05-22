import highlightPlayer from '../actions/HighlightPlayer';
import unhighlightPlayerReducer from '../actions/UnhighlightPlayer';
import initializePlayerReducer from '../actions/InitializePlayer';
import showVolumeSliderReducer from '../actions/ShowVolumeSlider';
import hideVolumeSliderReducer from '../actions/HideVolumeSlider';
import switchFullscreenReducer from '../actions/SwitchFullscreen';
import adaptPlayerToFullscreenReducer from '../actions/AdaptPlayerToFullscreen';
import adaptPlayerToNonFullscreenReducer from '../actions/AdaptPlayerToNonFullscreen';
import updateVolume from '../actions/UpdateVolume';
import saveActualVolumeAsPastVolumeReducer from '../actions/SaveActualVolumeAsPastVolume';
import updateVolumeSliderLeftMarginReducer from '../actions/UpdateVolumeSliderLeftMargin';
import preventMouseLeaveVolumeSliderReducer from '../actions/PreventMouseLeaveVolumeSlider';
import allowMouseLeaveVolumeSliderReducer from '../actions/AllowMouseLeaveVolumeSlider';
import highLightProgressBarReducer from '../actions/HighlightProgressBar';
import unhighLightProgressBarReducer from '../actions/UnhighlightProgressBar';
import readingNotTerminatedReducer from '../actions/ReadingNotTerminated';
import readingTerminatedReducer from '../actions/ReadingTerminated';
import updateCurrentTimeReducer from '../actions/UpdateCurrentTime';
import preventUnhighlightProgressBarReducer from '../actions/PreventUnhighlightProgressBar';
import allowUnhighlightProgressBarReducer from '../actions/AllowUnhighlightProgressBar';
import playReducer from '../actions/Play';
import pauseReducer from '../actions/Pause';
import showMenusReducer from '../actions/ShowMenus';
import hideMenus from '../actions/HideMenus';
import updateTimeLastUserActionReducer from '../actions/UpdateTimeLastUserAction';
import showCursorReducer from '../actions/ShowCursor';
import hideCursorReducer from '../actions/HideCursor';
import updateDurationReducer from '../actions/UpdateDuration';
import audioNotReadyReducer from '../actions/AudioNotReady';
import audioReadyReducer from '../actions/AudioReady';
import videoNotReadyReducer from '../actions/VideoNotReady';
import videoReadyReducer from '../actions/VideoReady';
import slideshowNotReadyReducer from '../actions/SlideshowNotReady';
import slideshowReadyReducer from '../actions/SlideshowReady';
import addImageReducer from '../actions/AddImage';
import loadingReducer from '../actions/Loading';
import notLoadingReducer from '../actions/NotLoading';
import updateAskedTimeReducer from '../actions/UpdateAskedTime';
import updateImageDisplayedReducer from '../actions/UpdateImageDisplayed';
import askPreviousImageReducer from '../actions/AskPreviousImage';
import askNextImageReducer from '../actions/AskNextImage';
import updateVideoWidthReducer from '../actions/UpdateVideoWidth';
import updateVideoHeightReducer from '../actions/UpdateVideoHeight';
import preventMenuHidingReducer from '../actions/PreventMenuHiding';
import allowMenuHidingReducer from '../actions/AllowMenuHiding';
import updateTimeRangeBufferedReducer from '../actions/UpdateTimeRangeBuffered';
import channelsContinueReducer from '../actions/ChannelsContinue';
import muteReducer from '../actions/Mute';
import unmuteReducer from '../actions/Unmute';
import { IState } from '../types/IState';
import { IAction } from '../types/IAction';
import vinylReadyReducer from '../actions/VinylReady';
import channelsWaitReducer from '../actions/ChannelsWait';

const reducer = (state: IState, action: IAction) => {
    if (state === undefined) {
        return null;
    }
    if (action === undefined) {
        return state;
    }
    switch (action.type) {
        case "UNMUTE":
            return unmuteReducer(state);
        case "MUTE":
            return muteReducer(state);
        case "VINYL_IS_READY":
            return vinylReadyReducer(state);
        case "CHANNELS_CONTINUE":
            return channelsContinueReducer(state);
        case "CHANNELS_WAIT":
            return channelsWaitReducer(state);
        case "UPDATE_TIME_RANGE_BUFFERED":
            return updateTimeRangeBufferedReducer(state, action);
        case "PREVENT_MENU_HIDING":
            return preventMenuHidingReducer(state);
        case "ALLOW_MENU_HIDING":
            return allowMenuHidingReducer(state);
        case "UPDATE_VIDEO_WIDTH":
            return updateVideoWidthReducer(state, action);
        case "UPDATE_VIDEO_HEIGHT":
            return updateVideoHeightReducer(state, action);
        case "ASK_NEXT_IMAGE":
            return askNextImageReducer(state);
        case "ASK_PREVIOUS_IMAGE":
            return askPreviousImageReducer(state);
        case 'UPDATE_IMAGE_DISPLAYED':
            return updateImageDisplayedReducer(state, action);
        case 'UPDATE_ASKED_TIME':
            return updateAskedTimeReducer(state, action);
        case 'NOT_LOADING':
            return notLoadingReducer(state);
        case 'LOADING':
            return loadingReducer(state);
        case 'ADD_IMAGE':
            return addImageReducer(state, action);
        case 'AUDIO_IS_NOT_READY':
            return audioNotReadyReducer(state);
        case 'AUDIO_IS_READY':
            return audioReadyReducer(state);
        case 'VIDEO_IS_NOT_READY':
            return videoNotReadyReducer(state);
        case 'VIDEO_IS_READY':
            return videoReadyReducer(state);
        case 'SLIDESHOW_IS_NOT_READY':
            return slideshowNotReadyReducer(state);
        case 'SLIDESHOW_IS_READY':
            return slideshowReadyReducer(state);
        case 'UPDATE_DURATION':
            return updateDurationReducer(state, action);
        case 'SHOW_CURSOR':
            return showCursorReducer(state);
        case 'HIDE_CURSOR':
            return hideCursorReducer(state);
        case 'UPDATE_CURRENT_TIME':
            return updateCurrentTimeReducer(state, action);
        case 'SHOW_MENUS':
            return showMenusReducer(state);
        case 'HIDE_MENUS':
            return hideMenus(state);
        case 'USER_ACTIVE':
            return updateTimeLastUserActionReducer(state);
        case 'PLAY':
            return playReducer(state);
        case 'PAUSE':
            return pauseReducer(state);
        case 'ALLOW_UNHIGHLIGHT_PROGRESS_BAR':
            return allowUnhighlightProgressBarReducer(state);
        case 'PREVENT_UNHIGHLIGHT_PROGRESS_BAR':
            return preventUnhighlightProgressBarReducer(state);
        case 'READING_TERMINATED':
            return readingTerminatedReducer(state);
        case 'READING_NOT_TERMINATED':
            return readingNotTerminatedReducer(state);
        case 'HIGHLIGHT_PROGRESS_BAR':
            return highLightProgressBarReducer(state);
        case 'UNHIGHLIGHT_PROGRESS_BAR':
            return unhighLightProgressBarReducer(state);
        case 'ALLOW_MOUSE_LEAVE_VOLUME_SLIDER':
            return allowMouseLeaveVolumeSliderReducer(state);
        case 'PREVENT_MOUSE_LEAVE_VOLUME_SLIDER':
            return preventMouseLeaveVolumeSliderReducer(state);
        case 'UPDATE_VOLUME_SLIDER_LEFT_MARGIN':
            return updateVolumeSliderLeftMarginReducer(state, action);
        case 'SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME':
            return saveActualVolumeAsPastVolumeReducer(state);
        case 'UPDATE_VOLUME':
            return updateVolume(state, action);
        case 'FULL_SCREEN_ENABLED':
            return adaptPlayerToFullscreenReducer(state);
        case 'FULL_SCREEN_DISABLED':
            return adaptPlayerToNonFullscreenReducer(state);
        case 'SWITCH_FULLSCREEN_STATE':
            return switchFullscreenReducer(state);
        case 'SHOW_VOLUME_SLIDER':
            return showVolumeSliderReducer(state);
        case 'HIDE_VOLUME_SLIDER':
            return hideVolumeSliderReducer(state);
        case 'HIGHLIGHT_PLAYER':
            return highlightPlayer(state);
        case 'UNHIGHLIGHT_PLAYER':
            return unhighlightPlayerReducer(state);
        case 'INITIALIZE_PLAYER':
            return initializePlayerReducer(state);
        case 'INIT_STATE':
            return action.payload.state;
        default:
            return state;
    }
};

export default reducer;