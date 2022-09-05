import { createSlice } from '@reduxjs/toolkit';
import adaptPlayerToFullscreenReducer from '../actions/AdaptPlayerToFullscreen';
import adaptPlayerToNonFullscreenReducer from '../actions/AdaptPlayerToNonFullscreen';
import addImageReducer from '../actions/AddImage';
import allowMenuHidingReducer from '../actions/AllowMenuHiding';
import allowMouseLeaveVolumeSliderReducer from '../actions/AllowMouseLeaveVolumeSlider';
import allowUnhighlightProgressBarReducer from '../actions/AllowUnhighlightProgressBar';
import askNextImageReducer from '../actions/AskNextImage';
import askPreviousImageReducer from '../actions/AskPreviousImage';
import audioNotReadyReducer from '../actions/AudioNotReady';
import audioReadyReducer from '../actions/AudioReady';
import channelsContinueReducer from '../actions/ChannelsContinue';
import channelsWaitReducer from '../actions/ChannelsWait';
import hideCursorReducer from '../actions/HideCursor';
import hideMenusReducer from '../actions/HideMenus';
import hideVolumeSliderReducer from '../actions/HideVolumeSlider';
import highLightPlayerReducer from '../actions/HighlightPlayer';
import highLightProgressBarReducer from '../actions/HighlightProgressBar';
import initializePlayerReducer from '../actions/InitializePlayer';
import initializeStateReducer from '../actions/InitStateReducer';
import loadingReducer from '../actions/Loading';
import muteReducer from '../actions/Mute';
import notLoadingReducer from '../actions/NotLoading';
import pauseReducer from '../actions/Pause';
import playReducer from '../actions/Play';
import preventMenuHidingReducer from '../actions/PreventMenuHiding';
import preventMouseLeaveVolumeSliderReducer from '../actions/PreventMouseLeaveVolumeSlider';
import preventUnhighlightProgressBarReducer from '../actions/PreventUnhighlightProgressBar';
import readingNotTerminatedReducer from '../actions/ReadingNotTerminated';
import readingTerminatedReducer from '../actions/ReadingTerminated';
import saveActualVolumeAsPastVolumeReducer from '../actions/SaveActualVolumeAsPastVolume';
import showCursorReducer from '../actions/ShowCursor';
import showMenusReducer from '../actions/ShowMenus';
import showVolumeSliderReducer from '../actions/ShowVolumeSlider';
import slideshowNotReadyReducer from '../actions/SlideshowNotReady';
import slideshowReadyReducer from '../actions/SlideshowReady';
import switchFullscreenReducer from '../actions/SwitchFullscreen';
import unhighlightPlayerReducer from '../actions/UnhighlightPlayer';
import unhighLightProgressBarReducer from '../actions/UnhighlightProgressBar';
import unmuteReducer from '../actions/Unmute';
import updateAskedTimeReducer from '../actions/UpdateAskedTime';
import updateCurrentTimeReducer from '../actions/UpdateCurrentTime';
import updateDurationReducer from '../actions/UpdateDuration';
import updateImageDisplayedReducer from '../actions/UpdateImageDisplayed';
import updateTimeLastUserActionReducer from '../actions/UpdateTimeLastUserAction';
import updateTimeRangeBufferedReducer from '../actions/UpdateTimeRangeBuffered';
import updateVideoHeightReducer from '../actions/UpdateVideoHeight';
import updateVideoWidthReducer from '../actions/UpdateVideoWidth';
import updateVolumeReducer from '../actions/UpdateVolume';
import updateVolumeSliderLeftMarginReducer from '../actions/UpdateVolumeSliderLeftMargin';
import videoNotReadyReducer from '../actions/VideoNotReady';
import videoReadyReducer from '../actions/VideoReady';
import vinylReadyReducer from '../actions/VinylReady';


export const slice = createSlice({
        name: 'main',
        initialState: {},
        reducers: {
            unmute: unmuteReducer,
            mute: muteReducer,
            vinylReady: vinylReadyReducer,
            channelsContinue: channelsContinueReducer,
            channelsWait: channelsWaitReducer,
            updateTimeRangeBuffered: updateTimeRangeBufferedReducer,
            preventMenuHiding: preventMenuHidingReducer,
            allowMenuHiding: allowMenuHidingReducer,
            updateVideoWidth: updateVideoWidthReducer,
            updateVideoHeight: updateVideoHeightReducer,
            updateImageDisplayed: updateImageDisplayedReducer,
            updateAskedTime: updateAskedTimeReducer,
            notLoading: notLoadingReducer,
            loading: loadingReducer,
            addImage: addImageReducer,
            audioNotReady: audioNotReadyReducer,
            audioReady: audioReadyReducer,
            videoNotReady: videoNotReadyReducer,
            videoReady: videoReadyReducer,
            slideshowNotReady: slideshowNotReadyReducer,
            slideshowReady: slideshowReadyReducer,
            updateDuration: updateDurationReducer,
            showCursor: showCursorReducer,
            hideCursor: hideCursorReducer,
            updateCurrentTime: updateCurrentTimeReducer,
            showMenus: showMenusReducer,
            hideMenus: hideMenusReducer,
            updateTimeLastUserAction: updateTimeLastUserActionReducer,
            play: playReducer,
            pause: pauseReducer,
            allowUnhighlightProgressBar: allowUnhighlightProgressBarReducer,
            preventUnhighlightProgressBar: preventUnhighlightProgressBarReducer,
            readingTerminated: readingTerminatedReducer,
            readingNotTerminated: readingNotTerminatedReducer,
            highLightProgressBar: highLightProgressBarReducer,
            unhighLightProgressBar: unhighLightProgressBarReducer,
            allowMouseLeaveVolumeSlider: allowMouseLeaveVolumeSliderReducer,
            preventMouseLeaveVolumeSlider: preventMouseLeaveVolumeSliderReducer,
            updateVolumeSliderLeftMargin: updateVolumeSliderLeftMarginReducer,
            saveActualVolumeAsPastVolume: saveActualVolumeAsPastVolumeReducer,
            updateVolume: updateVolumeReducer,
            adaptPlayerToFullscreen: adaptPlayerToFullscreenReducer,
            adaptPlayerToNonFullscreen: adaptPlayerToNonFullscreenReducer,
            switchFullscreen: switchFullscreenReducer,
            showVolumeSlider: showVolumeSliderReducer,
            hideVolumeSlider: hideVolumeSliderReducer,
            highLightPlayer: highLightPlayerReducer,
            unhighlightPlayer: unhighlightPlayerReducer,
            initializePlayer: initializePlayerReducer,
            askNextImage: askNextImageReducer,
            askPreviousImage: askPreviousImageReducer,
            initializeState: initializeStateReducer
        }
    });


export const actions = slice.actions;

export default slice.reducer;

// const reducer = (state: IState, action: IAction<IState>) => {
//     if (state === undefined) {
//         return null;
//     }
//     if (action === undefined) {
//         return state;
//     }
//     switch (action.type) {
//         case UNMUTE:
//             return unmuteReducer(state);
//         case MUTE:
//             return muteReducer(state);
//         case VINYL_IS_READY:
//             return vinylReadyReducer(state);
//         case CHANNELS_CONTINUE:
//             return channelsContinueReducer(state);
//         case CHANNELS_WAIT:
//             return channelsWaitReducer(state);
//         case UPDATE_TIME_RANGE_BUFFERED:
//             return updateTimeRangeBufferedReducer(state, action);
//         case PREVENT_MENU_HIDING:
//             return preventMenuHidingReducer(state);
//         case ALLOW_MENU_HIDING:
//             return allowMenuHidingReducer(state);
//         case UPDATE_VIDEO_WIDTH:
//             return updateVideoWidthReducer(state, action);
//         case UPDATE_VIDEO_HEIGHT:
//             return updateVideoHeightReducer(state, action);
//         case ASK_NEXT_IMAGE:
//             return askNextImageReducer(state);
//         case ASK_PREVIOUS_IMAGE:
//             return askPreviousImageReducer(state);
//         case UPDATE_IMAGE_DISPLAYED:
//             return updateImageDisplayedReducer(state, action);
//         case UPDATE_ASKED_TIME:
//             return updateAskedTimeReducer(state, action);
//         case NOT_LOADING:
//             return notLoadingReducer(state);
//         case LOADING:
//             return loadingReducer(state);
//         case ADD_IMAGE:
//             return addImageReducer(state, action);
//         case AUDIO_IS_NOT_READY:
//             return audioNotReadyReducer(state);
//         case AUDIO_IS_READY:
//             return audioReadyReducer(state);
//         case VIDEO_IS_NOT_READY:
//             return videoNotReadyReducer(state);
//         case VIDEO_IS_READY:
//             return videoReadyReducer(state);
//         case SLIDESHOW_IS_NOT_READY:
//             return slideshowNotReadyReducer(state);
//         case SLIDESHOW_IS_READY:
//             return slideshowReadyReducer(state);
//         case UPDATE_DURATION:
//             return updateDurationReducer(state, action);
//         case SHOW_CURSOR:
//             return showCursorReducer(state);
//         case HIDE_CURSOR:
//             return hideCursorReducer(state);
//         case UPDATE_CURRENT_TIME:
//             return updateCurrentTimeReducer(state, action);
//         case SHOW_MENUS:
//             return showMenusReducer(state);
//         case HIDE_MENUS:
//             return hideMenusReducer(state);
//         case USER_ACTIVE:
//             return updateTimeLastUserActionReducer(state);
//         case PLAY:
//             return playReducer(state);
//         case PAUSE:
//             return pauseReducer(state);
//         case ALLOW_UNHIGHLIGHT_PROGRESS_BAR:
//             return allowUnhighlightProgressBarReducer(state);
//         case PREVENT_UNHIGHLIGHT_PROGRESS_BAR:
//             return preventUnhighlightProgressBarReducer(state);
//         case READING_TERMINATED:
//             return readingTerminatedReducer(state);
//         case READING_NOT_TERMINATED:
//             return readingNotTerminatedReducer(state);
//         case HIGHLIGHT_PROGRESS_BAR:
//             return highLightProgressBarReducer(state);
//         case UNHIGHLIGHT_PROGRESS_BAR:
//             return unhighLightProgressBarReducer(state);
//         case ALLOW_MOUSE_LEAVE_VOLUME_SLIDER:
//             return allowMouseLeaveVolumeSliderReducer(state);
//         case PREVENT_MOUSE_LEAVE_VOLUME_SLIDER:
//             return preventMouseLeaveVolumeSliderReducer(state);
//         case UPDATE_VOLUME_SLIDER_LEFT_MARGIN:
//             return updateVolumeSliderLeftMarginReducer(state, action);
//         case SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME:
//             return saveActualVolumeAsPastVolumeReducer(state);
//         case UPDATE_VOLUME:
//             return updateVolumeReducer(state, action);
//         case FULL_SCREEN_ENABLED:
//             return adaptPlayerToFullscreenReducer(state);
//         case FULL_SCREEN_DISABLED:
//             return adaptPlayerToNonFullscreenReducer(state);
//         case SWITCH_FULLSCREEN_STATE:
//             return switchFullscreenReducer(state);
//         case SHOW_VOLUME_SLIDER:
//             return showVolumeSliderReducer(state);
//         case HIDE_VOLUME_SLIDER:
//             return hideVolumeSliderReducer(state);
//         case HIGHLIGHT_PLAYER:
//             return highLightPlayerReducer(state);
//         case UNHIGHLIGHT_PLAYER:
//             return unhighlightPlayerReducer(state);
//         case INITIALIZE_PLAYER:
//             return initializePlayerReducer(state);
//         case INIT_STATE:
//             return action.payload.state;
//         default:
//             return state;
//     }
// };

// export default reducer;