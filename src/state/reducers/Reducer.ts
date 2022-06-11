import unhighlightPlayerReducer, { UNHIGHLIGHT_PLAYER } from '../actions/UnhighlightPlayer';
import initializePlayerReducer, { INITIALIZE_PLAYER } from '../actions/InitializePlayer';
import showVolumeSliderReducer, { SHOW_VOLUME_SLIDER } from '../actions/ShowVolumeSlider';
import hideVolumeSliderReducer, { HIDE_VOLUME_SLIDER } from '../actions/HideVolumeSlider';
import switchFullscreenReducer, { SWITCH_FULLSCREEN_STATE } from '../actions/SwitchFullscreen';
import adaptPlayerToFullscreenReducer, { FULL_SCREEN_ENABLED } from '../actions/AdaptPlayerToFullscreen';
import adaptPlayerToNonFullscreenReducer, { FULL_SCREEN_DISABLED } from '../actions/AdaptPlayerToNonFullscreen';
import updateVolumeReducer, { UPDATE_VOLUME } from '../actions/UpdateVolume';
import saveActualVolumeAsPastVolumeReducer, { SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME } from '../actions/SaveActualVolumeAsPastVolume';
import updateVolumeSliderLeftMarginReducer, { UPDATE_VOLUME_SLIDER_LEFT_MARGIN } from '../actions/UpdateVolumeSliderLeftMargin';
import preventMouseLeaveVolumeSliderReducer, { PREVENT_MOUSE_LEAVE_VOLUME_SLIDER } from '../actions/PreventMouseLeaveVolumeSlider';
import allowMouseLeaveVolumeSliderReducer, { ALLOW_MOUSE_LEAVE_VOLUME_SLIDER } from '../actions/AllowMouseLeaveVolumeSlider';
import highLightProgressBarReducer, { HIGHLIGHT_PROGRESS_BAR } from '../actions/HighlightProgressBar';
import unhighLightProgressBarReducer, { UNHIGHLIGHT_PROGRESS_BAR } from '../actions/UnhighlightProgressBar';
import readingNotTerminatedReducer, { READING_NOT_TERMINATED } from '../actions/ReadingNotTerminated';
import readingTerminatedReducer, { READING_TERMINATED } from '../actions/ReadingTerminated';
import updateCurrentTimeReducer, { UPDATE_CURRENT_TIME } from '../actions/UpdateCurrentTime';
import preventUnhighlightProgressBarReducer, { PREVENT_UNHIGHLIGHT_PROGRESS_BAR } from '../actions/PreventUnhighlightProgressBar';
import allowUnhighlightProgressBarReducer, { ALLOW_UNHIGHLIGHT_PROGRESS_BAR } from '../actions/AllowUnhighlightProgressBar';
import playReducer, { PLAY } from '../actions/Play';
import pauseReducer, { PAUSE } from '../actions/Pause';
import showMenusReducer, { SHOW_MENUS } from '../actions/ShowMenus';
import hideMenusReducer, { HIDE_MENUS } from '../actions/HideMenus';
import updateTimeLastUserActionReducer, { USER_ACTIVE } from '../actions/UpdateTimeLastUserAction';
import showCursorReducer, { SHOW_CURSOR } from '../actions/ShowCursor';
import hideCursorReducer, { HIDE_CURSOR } from '../actions/HideCursor';
import updateDurationReducer, { UPDATE_DURATION } from '../actions/UpdateDuration';
import audioNotReadyReducer, { AUDIO_IS_NOT_READY } from '../actions/AudioNotReady';
import audioReadyReducer, { AUDIO_IS_READY } from '../actions/AudioReady';
import videoNotReadyReducer, { VIDEO_IS_NOT_READY } from '../actions/VideoNotReady';
import videoReadyReducer, { VIDEO_IS_READY } from '../actions/VideoReady';
import slideshowNotReadyReducer, { SLIDESHOW_IS_NOT_READY } from '../actions/SlideshowNotReady';
import slideshowReadyReducer, { SLIDESHOW_IS_READY } from '../actions/SlideshowReady';
import addImageReducer, { ADD_IMAGE } from '../actions/AddImage';
import loadingReducer, { LOADING } from '../actions/Loading';
import notLoadingReducer, { NOT_LOADING } from '../actions/NotLoading';
import updateAskedTimeReducer, { UPDATE_ASKED_TIME } from '../actions/UpdateAskedTime';
import updateImageDisplayedReducer, { UPDATE_IMAGE_DISPLAYED } from '../actions/UpdateImageDisplayed';
import askPreviousImageReducer, { ASK_PREVIOUS_IMAGE } from '../actions/AskPreviousImage';
import askNextImageReducer, { ASK_NEXT_IMAGE } from '../actions/AskNextImage';
import updateVideoWidthReducer, { UPDATE_VIDEO_WIDTH } from '../actions/UpdateVideoWidth';
import updateVideoHeightReducer, { UPDATE_VIDEO_HEIGHT } from '../actions/UpdateVideoHeight';
import preventMenuHidingReducer, { PREVENT_MENU_HIDING } from '../actions/PreventMenuHiding';
import allowMenuHidingReducer, { ALLOW_MENU_HIDING } from '../actions/AllowMenuHiding';
import updateTimeRangeBufferedReducer, { UPDATE_TIME_RANGE_BUFFERED } from '../actions/UpdateTimeRangeBuffered';
import channelsContinueReducer, { CHANNELS_CONTINUE } from '../actions/ChannelsContinue';
import muteReducer, { MUTE } from '../actions/Mute';
import unmuteReducer, { UNMUTE } from '../actions/Unmute';
import { IState } from '../types/IState';
import { IAction } from '../types/IAction';
import vinylReadyReducer, { VINYL_IS_READY } from '../actions/VinylReady';
import channelsWaitReducer, { CHANNELS_WAIT } from '../actions/ChannelsWait';
import highLightPlayerReducer, { HIGHLIGHT_PLAYER } from '../actions/HighlightPlayer';
import { INIT_STATE } from '../actions/Initstate';

const reducer = (state: IState, action: IAction<IState>) => {
    if (state === undefined) {
        return null;
    }
    if (action === undefined) {
        return state;
    }
    switch (action.type) {
        case UNMUTE:
            return unmuteReducer(state);
        case MUTE:
            return muteReducer(state);
        case VINYL_IS_READY:
            return vinylReadyReducer(state);
        case CHANNELS_CONTINUE:
            return channelsContinueReducer(state);
        case CHANNELS_WAIT:
            return channelsWaitReducer(state);
        case UPDATE_TIME_RANGE_BUFFERED:
            return updateTimeRangeBufferedReducer(state, action);
        case PREVENT_MENU_HIDING:
            return preventMenuHidingReducer(state);
        case ALLOW_MENU_HIDING:
            return allowMenuHidingReducer(state);
        case UPDATE_VIDEO_WIDTH:
            return updateVideoWidthReducer(state, action);
        case UPDATE_VIDEO_HEIGHT:
            return updateVideoHeightReducer(state, action);
        case ASK_NEXT_IMAGE:
            return askNextImageReducer(state);
        case ASK_PREVIOUS_IMAGE:
            return askPreviousImageReducer(state);
        case UPDATE_IMAGE_DISPLAYED:
            return updateImageDisplayedReducer(state, action);
        case UPDATE_ASKED_TIME:
            return updateAskedTimeReducer(state, action);
        case NOT_LOADING:
            return notLoadingReducer(state);
        case LOADING:
            return loadingReducer(state);
        case ADD_IMAGE:
            return addImageReducer(state, action);
        case AUDIO_IS_NOT_READY:
            return audioNotReadyReducer(state);
        case AUDIO_IS_READY:
            return audioReadyReducer(state);
        case VIDEO_IS_NOT_READY:
            return videoNotReadyReducer(state);
        case VIDEO_IS_READY:
            return videoReadyReducer(state);
        case SLIDESHOW_IS_NOT_READY:
            return slideshowNotReadyReducer(state);
        case SLIDESHOW_IS_READY:
            return slideshowReadyReducer(state);
        case UPDATE_DURATION:
            return updateDurationReducer(state, action);
        case SHOW_CURSOR:
            return showCursorReducer(state);
        case HIDE_CURSOR:
            return hideCursorReducer(state);
        case UPDATE_CURRENT_TIME:
            return updateCurrentTimeReducer(state, action);
        case SHOW_MENUS:
            return showMenusReducer(state);
        case HIDE_MENUS:
            return hideMenusReducer(state);
        case USER_ACTIVE:
            return updateTimeLastUserActionReducer(state);
        case PLAY:
            return playReducer(state);
        case PAUSE:
            return pauseReducer(state);
        case ALLOW_UNHIGHLIGHT_PROGRESS_BAR:
            return allowUnhighlightProgressBarReducer(state);
        case PREVENT_UNHIGHLIGHT_PROGRESS_BAR:
            return preventUnhighlightProgressBarReducer(state);
        case READING_TERMINATED:
            return readingTerminatedReducer(state);
        case READING_NOT_TERMINATED:
            return readingNotTerminatedReducer(state);
        case HIGHLIGHT_PROGRESS_BAR:
            return highLightProgressBarReducer(state);
        case UNHIGHLIGHT_PROGRESS_BAR:
            return unhighLightProgressBarReducer(state);
        case ALLOW_MOUSE_LEAVE_VOLUME_SLIDER:
            return allowMouseLeaveVolumeSliderReducer(state);
        case PREVENT_MOUSE_LEAVE_VOLUME_SLIDER:
            return preventMouseLeaveVolumeSliderReducer(state);
        case UPDATE_VOLUME_SLIDER_LEFT_MARGIN:
            return updateVolumeSliderLeftMarginReducer(state, action);
        case SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME:
            return saveActualVolumeAsPastVolumeReducer(state);
        case UPDATE_VOLUME:
            return updateVolumeReducer(state, action);
        case FULL_SCREEN_ENABLED:
            return adaptPlayerToFullscreenReducer(state);
        case FULL_SCREEN_DISABLED:
            return adaptPlayerToNonFullscreenReducer(state);
        case SWITCH_FULLSCREEN_STATE:
            return switchFullscreenReducer(state);
        case SHOW_VOLUME_SLIDER:
            return showVolumeSliderReducer(state);
        case HIDE_VOLUME_SLIDER:
            return hideVolumeSliderReducer(state);
        case HIGHLIGHT_PLAYER:
            return highLightPlayerReducer(state);
        case UNHIGHLIGHT_PLAYER:
            return unhighlightPlayerReducer(state);
        case INITIALIZE_PLAYER:
            return initializePlayerReducer(state);
        case INIT_STATE:
            return action.payload.state;
        default:
            return state;
    }
};

export default reducer;