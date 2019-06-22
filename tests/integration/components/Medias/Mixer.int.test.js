import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import Mixer from '../../../../src/components/Medias/Mixer';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - Mixer', () => {

    let store;
    let dispatchSpy;
    const loadSpy = jest.fn();
    const playSpy = jest.fn();
    const pauseSpy = jest.fn();
    const HTMLMediaElementMock = jest.fn();

    window.HTMLMediaElement.prototype.load = loadSpy;
    window.HTMLMediaElement.prototype.play = playSpy;
    window.HTMLMediaElement.prototype.pause = pauseSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });

    it('Mixer - Video channel', () => {

        store.dispatch({ type: "INIT_STATE", payload: { state: videoInitState() } });

        const mixerContainer = mount(
            <Provider store={store}>
                <Mixer />
            </Provider>
        );
        //Initialize player & load Video
        store.dispatch({ type: 'INITIALIZE_PLAYER' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "LOADING" });
        jest.clearAllMocks();

        //Start playing 
        store.dispatch({ type: 'UPDATE_DURATION', payload: { duration: 596.427756 } });
        store.dispatch({ type: 'UPDATE_VIDEO_WIDTH', payload: { videoWidth: 500 } });
        store.dispatch({ type: 'UPDATE_VIDEO_HEIGHT', payload: { videoHeight: 200 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: expect.anything() });
        expect(playSpy).toHaveBeenCalled();
        jest.clearAllMocks();

        //Change time
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 110 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 110 } });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: "isTreated" } });
        jest.clearAllMocks();

        //Drop progress scrubber button at the end of the progress bar to stop the video
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 596.427756 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'READING_TERMINATED' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PAUSE' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SHOW_MENUS' });
        jest.clearAllMocks();

        //Relaunch player
    });

    it('Mixer - Video channel autoplay mute & unmute', () => {

        store.dispatch({ type: "INIT_STATE", payload: { state: videoAutoplayMutedInitState() } });

        const mixerProvider = mount(
            <Provider store={store}>
                <Mixer />
            </Provider>
        );
        const videoTrack = mixerProvider.find("Video");
        const videoTrackInstance = videoTrack.instance();
       
        //Initialize player & play
        const e = new Event('load');
        window.dispatchEvent(e);
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'INITIALIZE_PLAYER' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PLAY' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'USER_ACTIVE' });
        expect(videoTrackInstance.video.muted).toBeTruthy();
        jest.clearAllMocks();

        //Start playing 
        store.dispatch({ type: 'UPDATE_DURATION', payload: { duration: 596.427756 } });
        store.dispatch({ type: 'UPDATE_VIDEO_WIDTH', payload: { videoWidth: 500 } });
        store.dispatch({ type: 'UPDATE_VIDEO_HEIGHT', payload: { videoHeight: 200 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: expect.anything() });
        expect(playSpy).toHaveBeenCalled();
        jest.clearAllMocks();

        //Start playing 
        store.dispatch({ type: 'UNMUTE' });
        
        expect(videoTrackInstance.video.muted).toBeFalsy();
    });

    it('Mixer - Audio channel autoplay mute & unmute', () => {

        store.dispatch({ type: "INIT_STATE", payload: { state: audioAutoplayMutedInitState() } });

        const mixerProvider = mount(
            <Provider store={store}>
                <Mixer />
            </Provider>
        );
        const audioTrack = mixerProvider.find("Audio");
        const audioTrackInstance = audioTrack.instance();
       
        //Initialize player & play
        const e = new Event('load');
        window.dispatchEvent(e);
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'INITIALIZE_PLAYER' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PLAY' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'USER_ACTIVE' });
        expect(audioTrackInstance.audio.muted).toBeTruthy();
        jest.clearAllMocks();

        //Start playing 
        store.dispatch({ type: 'UPDATE_DURATION', payload: { duration: 596.427756 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: expect.anything() });
        expect(playSpy).toHaveBeenCalled();
        jest.clearAllMocks();

        //Start playing 
        store.dispatch({ type: 'UNMUTE' });
    
        expect(audioTrackInstance.audio.muted).toBeFalsy();
    });

    

    it('Mixer - Audio channel', () => {

        store.dispatch({ type: "INIT_STATE", payload: { state: audioInitState() } });

        const progressBar = mount(
            <Provider store={store}>
                <Mixer />
            </Provider>
        );
        //Initialize player & load Video
        store.dispatch({ type: 'INITIALIZE_PLAYER' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "LOADING" });
        jest.clearAllMocks();

        //Start playing 
        store.dispatch({ type: 'UPDATE_DURATION', payload: { duration: 596.427756 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: expect.anything() });
        jest.clearAllMocks();

        //mute
        //store.dispatch({ type: 'MUTE', payload: { duration: 120 }  });

        //Change time
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 110 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 110 } });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: "isTreated" } });
        jest.clearAllMocks();

        //Terminate reading
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 596.427756 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'READING_TERMINATED' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PAUSE' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SHOW_MENUS' });
        jest.clearAllMocks();

    });

    it('Mixer - Slideshow', () => {

        store.dispatch({ type: "INIT_STATE", payload: { state: slideShowInitState() } });

        const progressBar = mount(
            <Provider store={store}>
                <Mixer />
            </Provider>
        );
        //Initialize player & load Video
        store.dispatch({ type: 'INITIALIZE_PLAYER' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "LOADING" });
        jest.clearAllMocks();

        //Change time
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 110 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 110 } });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: "isTreated" } });
        jest.clearAllMocks();

        //Terminate reading
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 596.427756 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'READING_TERMINATED' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PAUSE' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SHOW_MENUS' });
        jest.clearAllMocks();

    });

    it('Mixer - audioSlideshow', () => {

        store.dispatch({ type: "INIT_STATE", payload: { state: audioSlideShowInitState() } });
        const progressBar = mount(
            <Provider store={store}>
                <Mixer />
            </Provider>
        );
        //Initialize player & load Video
        store.dispatch({ type: 'INITIALIZE_PLAYER' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "LOADING" });
        jest.clearAllMocks();

        //Change time
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 110 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 110 } });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: "isTreated" } });
        jest.clearAllMocks();

        //Terminate reading
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 596.427756 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'READING_TERMINATED' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PAUSE' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SHOW_MENUS' });
        jest.clearAllMocks();

    });

    const initState = () => {
        return {
            channelsWait: false,
            timeRangeBuffered: 0,
            askNextImage: null,
            askPreviousImage: null,
            volume: 1,
            hasVideo: false,
            isVideoReady: false,
            hasAudio: false,
            isAudioReady: false,
            hasSlideshow: false,
            isSlideshowReady: false,
            isInitialized: false,
            currentTime: 0,
            askedTime: null,
            isPlaying: false,
            duration: 0,
            hasVinyl: false,
            isVinylReady: false,
            isReadingTerminated: false,
            allowUnhighlightProgressBar: true,
            autoplay: false,
            muted: false,
            isFullscreenActivated: false,
            width: 560,
            height: 315,
        }
    }

    const videoInitState = () => {
        return {
            ...initState(),
            hasVideo: true,
            video: "https://nusid.net/video.mp4",
        }
    }

    const videoAutoplayMutedInitState = () => {
        return {
            ...initState(),
            hasVideo: true,
            autoplay: true,
            muted: true,
            video: "https://nusid.net/video.mp4",
        }
    }

    const audioInitState = () => {
        return {
            ...initState(),
            hasAudio: true,
            audio: "https://nusid.net/audio.mp3",
            hasVinyl: true,
        }
    }

    const audioAutoplayMutedInitState = () => {
        return {
            ...initState(),
            hasAudio: true,
            audio: "https://nusid.net/audio.mp3",
            hasVinyl: true,
            autoplay: true,
            muted: true,
        }
    }

    const slideShowInitState = () => {
        return {
            ...initState(),
            hasSlideshow: true,
            duration: 28.0,
            imageDisplayed: {
                element: { width: "50px", height: "50px" }
            },
            slideshow: [
                { img: "https://nusid.net/slide1.jpg", endTime: 4.0 },
                { img: "https://nusid.net/slide2.jpg", endTime: 8.0 },
                { img: "https://nusid.net/slide3.jpg", endTime: 12.0 },
                { img: "https://nusid.net/slide4.jpg", endTime: 16.0 },
                { img: "https://nusid.net/slide5.jpg", endTime: 20.0 },
                { img: "https://nusid.net/slide6.jpg", endTime: 24.0 },
                { img: "https://nusid.net/slide7.jpg", endTime: 28.0 }
            ]
        }
    };

    const audioSlideShowInitState = () => {
        return {
            ...slideShowInitState(),
            audio: "https://nusid.net/audio.mp3",
            hasAudio: true,
        };
    }

    const audioShorterThanSlideShowInitState = () => {
        return {
            ...audioSlideShowInitState(),
            duration: 1000,
        };
    }
});