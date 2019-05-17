import reducer from './Reducer'

it('Test action - VINYL_IS_READY ', () => {
    const action = { type: 'VINYL_IS_READY' };
    const initState = { isVinylReady: false };
    const newState = reducer(initState, action);
    expect(newState.isVinylReady).toBeTruthy();
});

it('Test action - FULL_SCREEN_DISABLED', () => {
    const action = { type: 'FULL_SCREEN_DISABLED' };
    const initState = { isFullscreenActivated: true };
    const newState = reducer(initState, action);
    expect(newState.isFullscreenActivated).toBeFalsy();
});

it('Test action - ADD_IMAGE', () => {
    const action = { type: 'ADD_IMAGE', payload: { index: 1, image: "imageObject" } };
    const initState = { slideshow: [{ src: "imagelink0" }, { src: "imagelink1" }] };
    const newState = reducer(initState, action);
    expect(newState.slideshow.length).toEqual(2);
    expect(newState.slideshow[0].element).toBeUndefined();
    expect(newState.slideshow[1].element).toEqual("imageObject");
});

it('Test action - ALLOW_MENU_HIDING', () => {
    const action = { type: 'ALLOW_MENU_HIDING' };
    const initState = { allowMenuHiding: false };
    const newState = reducer(initState, action);
    expect(newState.allowMenuHiding).toBeTruthy();
});

it('Test action - ALLOW_MOUSE_LEAVE_VOLUME_SLIDER', () => {
    const action = { type: 'ALLOW_MOUSE_LEAVE_VOLUME_SLIDER' };
    const initState = { allowMouseLeaveVolumeSlider: false };
    const newState = reducer(initState, action);
    expect(newState.allowMouseLeaveVolumeSlider).toBeTruthy();
});


it('Test action - ALLOW_UNHIGHLIGHT_PROGRESS_BAR', () => {
    const action = { type: 'ALLOW_UNHIGHLIGHT_PROGRESS_BAR' };
    const initState = { allowMouseLeaveVolumeSlider: false };
    const newState = reducer(initState, action);
    expect(newState.allowUnhighlightProgressBar).toBeTruthy();
});

it('Test action - ASK_NEXT_IMAGE', () => {
    const action = { type: 'ASK_NEXT_IMAGE' };
    const initDate = new Date("Tue Jan 12 21:33:28 +0000 2010");
    const initState = { askNextImage: initDate };
    const newState = reducer(initState, action);
    expect(newState.askNextImage > initDate).toBeTruthy();
});

it('Test action - ASK_PREVIOUS_IMAGE', () => {
    const action = { type: 'ASK_PREVIOUS_IMAGE' };
    const initDate = new Date("Tue Jan 12 21:33:28 +0000 2010");
    const initState = { askPreviousImage: initDate };
    const newState = reducer(initState, action);
    expect(newState.askPreviousImage > initDate).toBeTruthy();
});

it('Test action - AUDIO_IS_NOT_READY ', () => {
    const action = { type: 'AUDIO_IS_NOT_READY' };
    const initState = { isAudioReady: true };
    const newState = reducer(initState, action);
    expect(newState.isAudioReady).toBeFalsy();
});

it('Test action - AUDIO_IS_READY ', () => {
    const action = { type: 'AUDIO_IS_READY' };
    const initState = { isAudioReady: false };
    const newState = reducer(initState, action);
    expect(newState.isAudioReady).toBeTruthy();
});

it('Test action - CHANNELS_CONTINUE ', () => {
    const action = { type: 'CHANNELS_CONTINUE' };
    const initState = { channelsWait: true };
    const newState = reducer(initState, action);
    expect(newState.channelsWait).toBeFalsy();
});

it('Test action - CHANNELS_WAIT ', () => {
    const action = { type: 'CHANNELS_WAIT' };
    const initState = { channelsWait: false };
    const newState = reducer(initState, action);
    expect(newState.channelsWait).toBeTruthy();
});

it('Test action - CHANNELS_WAIT ', () => {
    const action = { type: 'CHANNELS_WAIT' };
    const initState = { hideCursor: true };
    const newState = reducer(initState, action);
    expect(newState.hideCursor).toBeTruthy();
});

/*
case "UNMUTE":
            return unmute(state);
        case "MUTE":
            return mute(state);
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
            */