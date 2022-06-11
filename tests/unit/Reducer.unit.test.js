import reducer from '../../src/reducers/Reducer'

it('Test action - VINYL_IS_READY ', () => {
    const action = { type: 'VINYL_IS_READY' };
    const initState = { isVinylReady: false };
    const newState = reducer(initState, action);
    expect(newState.isVinylReady).toBeTruthy();
});

it('Test action - FULL_SCREEN_ENABLED ', () => {
    const action = adaptPlayerToFullscreen();
    const initState = { isFullscreenActivated: false };
    const newState = reducer(initState, action);
    expect(newState.isFullscreenActivated).toBeTruthy();
});

it('Test action - FULL_SCREEN_DISABLED', () => {
    const action = adaptPlayerToNonFullscreen();
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

it('Test action - HIDE_CURSOR ', () => {
    const action = { type: 'HIDE_CURSOR' };
    let initState = { hideCursor: true, isFullscreen: false };
    let newState = reducer(initState, action);
    expect(newState.hideCursor).toBeTruthy();
    initState = { hideCursor: true, isFullscreen: true };
    newState = reducer(initState, action);
    expect(newState.hideCursor).toBeFalsy();
});

it('Test action - HIDE_MENUS ', () => {
    const action = hideMenus();
    const initState = { showMenus: true };
    const newState = reducer(initState, action);
    expect(newState.showMenus).toBeFalsy();
});

it('Test action - HIDE_VOLUME_SLIDER ', () => {
    const action = { type: 'HIDE_VOLUME_SLIDER' };
    const initState = { showVolumeSlider: true };
    const newState = reducer(initState, action);
    expect(newState.showVolumeSlider).toBeFalsy();
});

it('Test action - HIGHLIGHT_PLAYER ', () => {
    const action = highLightPlayer();
    const initState = { isPlayerHighlighted: false };
    const newState = reducer(initState, action);
    expect(newState.isPlayerHighlighted).toBeTruthy();
});


it('Test action - HIGHLIGHT_PROGRESS_BAR ', () => {
    const action = { type: 'HIGHLIGHT_PROGRESS_BAR' };
    const initState = { highlightProgressBar: false };
    const newState = reducer(initState, action);
    expect(newState.highlightProgressBar).toBeTruthy();
});

it('Test action - INITIALIZE_PLAYER ', () => {
    const action = { type: 'INITIALIZE_PLAYER' };
    const initState = { isInitialized: false };
    const newState = reducer(initState, action);
    expect(newState.isInitialized).toBeTruthy();
});

it('Test action - LOADING ', () => {
    const action = { type: 'LOADING' };
    const initState = { isLoading: false };
    const newState = reducer(initState, action);
    expect(newState.isLoading).toBeTruthy();
});

it('Test action - MUTE ', () => {
    const action = { type: 'MUTE' };
    const initState = { muted: false };
    const newState = reducer(initState, action);
    expect(newState.muted).toBeTruthy();
});

it('Test action - NOT_LOADING ', () => {
    const action = { type: 'NOT_LOADING' };
    const initState = { isLoading: true };
    const newState = reducer(initState, action);
    expect(newState.isLoading).toBeFalsy();
});

it('Test action - PAUSE ', () => {
    const action = { type: 'PAUSE' };
    const initState = { isPlaying: true };
    const newState = reducer(initState, action);
    expect(newState.isPlaying).toBeFalsy();
});

it('Test action - PLAY ', () => {
    const action = { type: 'PLAY' };
    const initState = { isPlaying: false };
    const newState = reducer(initState, action);
    expect(newState.isPlaying).toBeTruthy();
});

it('Test action - PREVENT_MENU_HIDING ', () => {
    const action = { type: 'PREVENT_MENU_HIDING' };
    const initState = { allowMenuHiding: true };
    const newState = reducer(initState, action);
    expect(newState.allowMenuHiding).toBeFalsy();
});

it('Test action - PREVENT_MOUSE_LEAVE_VOLUME_SLIDER ', () => {
    const action = { type: 'PREVENT_MOUSE_LEAVE_VOLUME_SLIDER' };
    const initState = { allowMouseLeaveVolumeSlider: true };
    const newState = reducer(initState, action);
    expect(newState.allowMouseLeaveVolumeSlider).toBeFalsy();
});

it('Test action - PREVENT_UNHIGHLIGHT_PROGRESS_BAR ', () => {
    const action = { type: 'PREVENT_UNHIGHLIGHT_PROGRESS_BAR' };
    const initState = { allowUnhighlightProgressBar: true };
    const newState = reducer(initState, action);
    expect(newState.allowUnhighlightProgressBar).toBeFalsy();
});

it('Test action - READING_NOT_TERMINATED ', () => {
    const action = { type: 'READING_NOT_TERMINATED' };
    const initState = { isReadingTerminated: true };
    const newState = reducer(initState, action);
    expect(newState.isReadingTerminated).toBeFalsy();
});

it('Test action - READING_TERMINATED ', () => {
    const action = { type: 'READING_TERMINATED' };
    const initState = { isReadingTerminated: false };
    const newState = reducer(initState, action);
    expect(newState.isReadingTerminated).toBeTruthy();
});

it('Test action - SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME ', () => {
    const action = { type: 'SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME' };
    const initState = { pastVolume: 0, volume: 1 };
    const newState = reducer(initState, action);
    expect(newState.pastVolume).toEqual(1);
});

it('Test action - SHOW_CURSOR ', () => {
    const action = { type: 'SHOW_CURSOR' };
    const initState = { showCursor: false };
    const newState = reducer(initState, action);
    expect(newState.showCursor).toBeTruthy();
});

it('Test action - SHOW_MENUS ', () => {
    const action = { type: 'SHOW_MENUS' };
    const initState = { showMenus: false };
    const newState = reducer(initState, action);
    expect(newState.showMenus).toBeTruthy();
});

it('Test action - SHOW_VOLUME_SLIDER ', () => {
    const action = { type: 'SHOW_VOLUME_SLIDER' };
    const initState = { showVolumeSlider: false };
    const newState = reducer(initState, action);
    expect(newState.showVolumeSlider).toBeTruthy();
});

it('Test action - SLIDESHOW_IS_NOT_READY ', () => {
    const action = { type: 'SLIDESHOW_IS_NOT_READY' };
    const initState = { isSlideshowReady: true };
    const newState = reducer(initState, action);
    expect(newState.isSlideshowReady).toBeFalsy();
});

it('Test action - SLIDESHOW_IS_READY ', () => {
    const action = { type: 'SLIDESHOW_IS_READY' };
    const initState = { isSlideshowReady: false };
    const newState = reducer(initState, action);
    expect(newState.isSlideshowReady).toBeTruthy();
});

it('Test action - SWITCH_FULLSCREEN_STATE ', () => {
    const action = { type: 'SWITCH_FULLSCREEN_STATE' };
    const initState = { isFullscreen: false };
    const newState = reducer(initState, action);
    expect(newState.isFullscreen).toBeTruthy();
    const newState2 = reducer(newState, action);
    expect(newState2.isFullscreen).toBeFalsy();
});

it('Test action - UNHIGHLIGHT_PLAYER ', () => {
    const action = unhighlightPlayer();
    const initState = { isPlayerHighlighted: true };
    const newState = reducer(initState, action);
    expect(newState.isPlayerHighlighted).toBeFalsy();
});

it('Test action - UNHIGHLIGHT_PROGRESS_BAR ', () => {
    const action = { type: 'UNHIGHLIGHT_PROGRESS_BAR' };
    const initState = { highlightProgressBar: true };
    const newState = reducer(initState, action);
    expect(newState.highlightProgressBar).toBeFalsy();
});

it('Test action - UNMUTE ', () => {
    const action = { type: 'UNMUTE' };
    const initState = { muted: true };
    const newState = reducer(initState, action);
    expect(newState.muted).toBeFalsy();
});

it('Test action - UPDATE_ASKED_TIME ', () => {
    const now = new Date();
    const oldDate = new Date("Tue Jan 12 21:33:28 +0000 2010");
    const action = { type: 'UPDATE_ASKED_TIME', payload: { askedTime: now } };
    const initState = { askedTime: oldDate };
    const newState = reducer(initState, action);
    expect(newState.askedTime).toEqual(now);
});

it('Test action - USER_ACTIVE ', () => {
    const oldDate = new Date("Tue Jan 12 21:33:28 +0000 2010");
    const action = { type: 'USER_ACTIVE' };
    const initState = { timeLastUserAction: oldDate };
    const newState = reducer(initState, action);
    expect(newState.timeLastUserAction > oldDate).toBeTruthy();
});

it('Test action - UPDATE_CURRENT_TIME ', () => {
    const now = new Date();
    const oldDate = new Date("Tue Jan 12 21:33:28 +0000 2010");
    const action = { type: 'UPDATE_CURRENT_TIME', payload: { currentTime: now } };
    const initState = { currentTime: oldDate };
    const newState = reducer(initState, action);
    expect(newState.currentTime).toEqual(now);
});

it('Test action - UPDATE_DURATION ', () => {
    const duration = 3600;
    const action = { type: 'UPDATE_DURATION', payload: { duration: duration } };
    const initState = { duration: 0 };
    const newState = reducer(initState, action);
    expect(newState.duration).toEqual(duration);
});

it('Test action - UPDATE_IMAGE_DISPLAYED ', () => {
    const imageDisplayed = "another image";
    const action = { type: 'UPDATE_IMAGE_DISPLAYED', payload: { imageDisplayed: imageDisplayed } };
    const initState = { imageDisplayed: "an image" };
    const newState = reducer(initState, action);
    expect(newState.imageDisplayed).toEqual(imageDisplayed);
});

it('Test action - UPDATE_TIME_RANGE_BUFFERED ', () => {
    const timeRangeBuffered = 10;
    const action = { type: 'UPDATE_TIME_RANGE_BUFFERED', payload: { timeRangeBuffered: timeRangeBuffered } };
    const initState = { timeRangeBuffered: 5 };
    const newState = reducer(initState, action);
    expect(newState.timeRangeBuffered).toEqual(timeRangeBuffered);
});

it('Test action - UPDATE_VIDEO_HEIGHT ', () => {
    const videoHeight = 500;
    const action = { type: 'UPDATE_VIDEO_HEIGHT', payload: { videoHeight: videoHeight } };
    const initState = { videoHeight: 0 };
    const newState = reducer(initState, action);
    expect(newState.videoHeight).toEqual(videoHeight);
});

it('Test action - UPDATE_VIDEO_WIDTH ', () => {
    const videoWidth = 300;
    const action = { type: 'UPDATE_VIDEO_WIDTH', payload: { videoWidth: videoWidth } };
    const initState = { videoWidth: 0 };
    const newState = reducer(initState, action);
    expect(newState.videoWidth).toEqual(videoWidth);
});

it('Test action - UPDATE_VOLUME ', () => {
    const volume = 0.8;
    const action = { type: 'UPDATE_VOLUME', payload: { volume: volume } };
    const initState = { volume: 1.0 };
    const newState = reducer(initState, action);
    expect(newState.volume).toEqual(volume);
});

it('Test action - UPDATE_VOLUME_SLIDER_LEFT_MARGIN ', () => {
    const volumeSliderLeftMargin = 10;
    const action = { type: 'UPDATE_VOLUME_SLIDER_LEFT_MARGIN', payload: { volumeSliderLeftMargin: volumeSliderLeftMargin } };
    const initState = { volumeSliderLeftMargin: 15 };
    const newState = reducer(initState, action);
    expect(newState.volumeSliderLeftMargin).toEqual(volumeSliderLeftMargin);
});

it('Test action - VIDEO_IS_NOT_READY ', () => {
    const action = { type: 'VIDEO_IS_NOT_READY' };
    const initState = { isVideoReady: true };
    const newState = reducer(initState, action);
    expect(newState.isVideoReady).toBeFalsy();
});

it('Test action - VIDEO_IS_READY ', () => {
    const action = { type: 'VIDEO_IS_READY' };
    const initState = { isVideoReady: false };
    const newState = reducer(initState, action);
    expect(newState.isVideoReady).toBeTruthy();
});

it('Test action - UNKNOWN_ACTON ', () => {
    const action = { type: 'UNKNOWN_ACTON' };
    const initState = { prop1: true, prop2: true };
    const newState = reducer(initState, action);
    expect(newState.prop1).toBeTruthy();
    expect(newState.prop2).toBeTruthy();
});

it('Test action - INIT_STATE ', () => {
    const action = { type: 'INIT_STATE', payload: { state: { prop1: true, prop2: true } } };
    const initState = null;
    const newState = reducer(initState, action);
    expect(newState.prop1).toBeTruthy();
    expect(newState.prop2).toBeTruthy();
});

it('Test action - undefined ', () => {
    const action = undefined;
    const initState = { prop1: true, prop2: true };
    const newState = reducer(initState, action);
    expect(newState.prop1).toBeTruthy();
    expect(newState.prop2).toBeTruthy();
});