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

    window.HTMLMediaElement.prototype.load = loadSpy;
    window.HTMLMediaElement.prototype.play = playSpy;
    window.HTMLMediaElement.prototype.pause = pauseSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });

    it('Mixer - Video channel', () => {

        store.dispatch({ type: "INIT_STATE", payload: { state: videoInitState() } });

        const mixerProvider = mount(
            <Provider store={store}>
                <Mixer />
            </Provider>
        );
        const videoTrack = mixerProvider.find("Video");
        const videoTrackInstance = videoTrack.instance();

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

        //Relaunch Play
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 0} });
        
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'READING_NOT_TERMINATED'});
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PLAY'});

        //Change volume
        store.dispatch({ type: 'UPDATE_VOLUME', payload: { volume: 0.5 } });
        
        expect(videoTrackInstance.video.volume).toBe(0.5);
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

        //Unmute
        store.dispatch({ type: 'UNMUTE' });
        expect(videoTrackInstance.video.muted).toBeFalsy();

        //Mute
        store.dispatch({ type: 'MUTE' });
        expect(videoTrackInstance.video.muted).toBeTruthy();
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

        //Unmute 
        store.dispatch({ type: 'UNMUTE' });
        expect(audioTrackInstance.audio.muted).toBeFalsy();

        //Mute 
        store.dispatch({ type: 'MUTE' });
        expect(audioTrackInstance.audio.muted).toBeTruthy();
    });

    

    it('Mixer - Audio channel', () => {

        store.dispatch({ type: "INIT_STATE", payload: { state: audioInitState() } });

        const mixerProvider = mount(
            <Provider store={store}>
                <Mixer />
            </Provider>
        );
        const audioTrack = mixerProvider.find("Audio");
        const audioTrackInstance = audioTrack.instance();
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

        //Relaunch Play
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 0} });
        
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'READING_NOT_TERMINATED'});
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PLAY'});

        //Change volume
        store.dispatch({ type: 'UPDATE_VOLUME', payload: { volume: 0.5 } });
        
        expect(audioTrackInstance.audio.volume).toBe(0.5);

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
        expect(store.getState().isPlaying).toBeFalsy();
        jest.clearAllMocks();

        //Ask previous image when reading is terminated
        store.dispatch({ type: 'ASK_PREVIOUS_IMAGE' });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'READING_NOT_TERMINATED' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 24 } });
        jest.clearAllMocks();

        //Ask previous image
        store.dispatch({ type: 'ASK_PREVIOUS_IMAGE' });

        expect(dispatchSpy).not.toHaveBeenCalledWith({ type: 'READING_NOT_TERMINATED' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 20 } });
        jest.clearAllMocks();
        
        //Play & ask previous image
        store.dispatch({ type: 'PLAY' });
        store.dispatch({ type: 'ASK_PREVIOUS_IMAGE' });

        expect(dispatchSpy).not.toHaveBeenCalledWith({ type: 'READING_NOT_TERMINATED' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 16 } });
        expect(store.getState().isPlaying).toBeTruthy();
        jest.clearAllMocks();

        //Ask previous image until beginning
        store.dispatch({ type: 'ASK_PREVIOUS_IMAGE' });
        store.dispatch({ type: 'ASK_PREVIOUS_IMAGE' });
        store.dispatch({ type: 'ASK_PREVIOUS_IMAGE' });
        store.dispatch({ type: 'ASK_PREVIOUS_IMAGE' });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 0 } });
        expect(store.getState().isPlaying).toBeTruthy();
        jest.clearAllMocks();

        //Ask next image
        store.dispatch({ type: 'ASK_NEXT_IMAGE' });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 4 } });
        expect(store.getState().isPlaying).toBeTruthy();
        jest.clearAllMocks();

        //Ask next image until reading is terminated
        store.dispatch({ type: 'ASK_NEXT_IMAGE' });
        store.dispatch({ type: 'ASK_NEXT_IMAGE' });
        store.dispatch({ type: 'ASK_NEXT_IMAGE' });
        store.dispatch({ type: 'ASK_NEXT_IMAGE' });
        store.dispatch({ type: 'ASK_NEXT_IMAGE' });
        store.dispatch({ type: 'ASK_NEXT_IMAGE' });
        store.dispatch({ type: 'ASK_NEXT_IMAGE' });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 28 } });
        expect(store.getState().isPlaying).toBeFalsy();
        jest.clearAllMocks();

        //Relaunch Play
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 0} });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'READING_NOT_TERMINATED'});
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PLAY'});

        //Unmute Mute impossible - just for test coverage 
        store.dispatch({ type: 'UNMUTE' });
        store.dispatch({ type: 'MUTE' });
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

    it('Mixer - audioSlideshow - audio shorter', () => {

        store.dispatch({ type: "INIT_STATE", payload: { state: audioSlideShowInitState() } });
        const mixerProvider = mount(
            <Provider store={store}>
                <Mixer />
            </Provider>
        );
        const audioTrack = mixerProvider.find("Audio");
        const audioTrackInstance = audioTrack.instance();
        audioTrackInstance.audio = {
            play: playSpy,
            pause: pauseSpy,
            muted: false,
            volume: 1,
            duration: 180
        }

        //Initialize player & load Video
        store.dispatch({ type: 'INITIALIZE_PLAYER' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "LOADING" });
        jest.clearAllMocks();

        //Change time before audio ends
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 110 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 110 } });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: "isTreated" } });
        jest.clearAllMocks();
        
        //Change time after audio ends
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 250 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 250 } });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: "isTreated" } });
        jest.clearAllMocks();

        //Terminate reading
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 596.427756 } });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'READING_TERMINATED' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PAUSE' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SHOW_MENUS' });
        jest.clearAllMocks();

        //Relaunch Play
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 0} });

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'READING_NOT_TERMINATED'});
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PLAY'});

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