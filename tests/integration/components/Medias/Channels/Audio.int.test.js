import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import { isIE } from '../../../../../src/services/Utils';
import Audio from '../../../../../src/components/Medias/Channels/Audio';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - Audio', () => {

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

    it('Audio - timeRangeBuffered', () => {

        const initState = {
            duration: 120,
            audio: "audio-link",
            hasVinyl: true,
            muted: false
        };
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const audioProvider = mount(
            <Provider store={store}>
                <Audio />
            </Provider>
        );
        const audioTrack = audioProvider.find("Audio");
        const audioTrackInstance = audioTrack.instance();
        audioTrackInstance.audio = {
            buffered: {
                0: { start: 0, end: 5 },
                1: { start: 30, end: 40 },
                2: { start: 60, end: 111 },
                3: { start: 115, end: 120 },
                length: 4,
                start: (i) => audioTrackInstance.audio.buffered[i].start,
                end: (i) => audioTrackInstance.audio.buffered[i].end
            }
        }
        expect(audioTrackInstance.timeRangeBuffered(0)).toBe(5);
        expect(audioTrackInstance.timeRangeBuffered(6)).toBe(6);
        expect(audioTrackInstance.timeRangeBuffered(59)).toBe(59);
        expect(audioTrackInstance.timeRangeBuffered(60)).toBe(111);
        expect(audioTrackInstance.timeRangeBuffered(111)).toBe(111);
        expect(audioTrackInstance.timeRangeBuffered(115)).toBe(120);
        expect(audioTrackInstance.timeRangeBuffered(120)).toBe(120);
        expect(audioTrackInstance.timeRangeBuffered(130)).toBe(130);

    });

    it('audio - load', () => {
        const initState = {
            duration: 0,
            audio: "audio-link",
            muted: false
        };
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const audioProvider = mount(
            <Provider store={store}>
                <Audio />
            </Provider>
        );
        const audioTrack = audioProvider.find("Audio");
        const audioTrackInstance = audioTrack.instance();
        audioTrackInstance.audio = {
            load: loadSpy,
            paused: true
        }

        audioTrackInstance.load();
        expect(loadSpy).toHaveBeenCalled();
        jest.clearAllMocks();
    });

    it('audio - Play', () => {
        const initState = {
            duration: 0,
            audio: "audio-link",
            muted: false
        };
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });
        const playedResolvePromise = jest.fn();

        const audioProvider = mount(
            <Provider store={store}>
                <Audio />
            </Provider>
        );
        const audioTrack = audioProvider.find("Audio");
        const audioTrackInstance = audioTrack.instance();
        audioTrackInstance.audio = {
            play: playSpy.mockImplementation(() => new Promise((resolve, reject) => {
                playedResolvePromise()
                resolve()
            })),
            paused: true
        }
        audioTrackInstance.play();
        expect(playSpy).toHaveBeenCalled();
        expect(playedResolvePromise).toHaveBeenCalled();
        jest.clearAllMocks();

        audioTrackInstance.audio = {
            play: playSpy.mockImplementation(() => new Promise((resolve, reject) => {
                playedResolvePromise()
                resolve()
            })),
            paused: false
        }
        audioTrackInstance.play();
        expect(playSpy).not.toHaveBeenCalled();
        expect(playedResolvePromise).not.toHaveBeenCalled();
        jest.clearAllMocks();
    });

    it('audio - Pause', () => {
        const initState = {
            duration: 0,
            audio: "audio-link",
            muted: false
        };
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const audioProvider = mount(
            <Provider store={store}>
                <Audio />
            </Provider>
        );
        const audioTrack = audioProvider.find("Audio");
        const audioTrackInstance = audioTrack.instance();
        audioTrackInstance.audio = {
            pause: pauseSpy,
            paused: false
        }
        audioTrackInstance.pause();
        expect(pauseSpy).toHaveBeenCalled();
        jest.clearAllMocks();

        audioTrackInstance.audio = {
            pause: pauseSpy,
            paused: true
        }
        audioTrackInstance.pause();
        expect(pauseSpy).not.toHaveBeenCalled();
        jest.clearAllMocks();
    });

    it('audio - Change time', () => {
        const initState = {
            duration: 120,
            audio: "audio-link",
            muted: false
        };
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const audioProvider = mount(
            <Provider store={store}>
                <Audio />
            </Provider>
        );
        const audioTrack = audioProvider.find("Audio");
        const audioTrackInstance = audioTrack.instance();
        audioTrackInstance.audio = {
            currentTime: 0,
        }
        audioTrackInstance.changeTime(40);
        expect(audioTrackInstance.audio.currentTime).toBe(40);
    });

    it('audio - Stop', () => {
        const initState = {
            duration: 120,
            audio: "audio-link",
            muted: false
        };
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const audioProvider = mount(
            <Provider store={store}>
                <Audio />
            </Provider>
        );
        const audioTrack = audioProvider.find("Audio");
        const audioTrackInstance = audioTrack.instance();
        audioTrackInstance.audio = {
            pause: pauseSpy,
            paused: false,
            duration:120,
            currentTime:0
        }
        audioTrackInstance.stop();
        expect(pauseSpy).toHaveBeenCalled();
        expect(audioTrackInstance.audio.currentTime).toBe(120);
        jest.clearAllMocks();

        audioTrackInstance.audio = {
            pause: pauseSpy,
            paused: true,
            duration:120,
            currentTime:0
        }
        audioTrackInstance.stop();
        expect(pauseSpy).not.toHaveBeenCalled();
        expect(audioTrackInstance.audio.currentTime).toBe(120);
        jest.clearAllMocks();
    });

    it('Audio - events - Internet Explorer', () => {
        const initState = {
            duration: 0,
            audio: "audio-link",
            hasVinyl: true,
            muted: false
        };

        navigator.__defineGetter__('userAgent', function () {
            return 'Trident MSIE' // customized user agent
        });

        expect(isIE()).toBeTruthy()

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const audioProvider = mount(
            <Provider store={store}>
                <Audio />
            </Provider>
        );
        const audioTrack = audioProvider.find("Audio");
        const audioTrackInstance = audioTrack.instance();
        audioTrackInstance.audio = {
            duration: 120
        }

        audioTrack.simulate("waiting");
        expect(dispatchSpy).not.toHaveBeenCalledWith({ type: 'AUDIO_IS_NOT_READY' });
        jest.clearAllMocks();

        audioTrack.simulate("canplaythrough");
        expect(dispatchSpy).not.toHaveBeenCalledWith({ type: 'AUDIO_IS_READY' });
        jest.clearAllMocks();

        audioTrack.simulate("seeking");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'AUDIO_IS_NOT_READY' });
        jest.clearAllMocks();

        audioTrack.simulate("seeked");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'AUDIO_IS_READY' });
        jest.clearAllMocks();

        audioTrack.simulate("play");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'AUDIO_IS_READY' });
        jest.clearAllMocks();

        audioTrack.simulate("loadedmetadata");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_DURATION', payload: { duration: 120 } });
        jest.clearAllMocks();
    });

    it('Audio - events - Chrome/Firefox/Safari...', () => {
        const initState = {
            duration: 0,
            audio: "audio-link",
            hasVinyl: true,
            muted: false
        };

        navigator.__defineGetter__('userAgent', function () {
            return 'Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0'
        });

        expect(isIE()).toBeFalsy()

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const audioProvider = mount(
            <Provider store={store}>
                <Audio />
            </Provider>
        );
        const audioTrack = audioProvider.find("Audio");
        const audioTrackInstance = audioTrack.instance();
        audioTrackInstance.audio = {
            duration: 120,
            currentTime: 100
        }

        audioTrack.simulate("waiting");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'AUDIO_IS_NOT_READY' });
        jest.clearAllMocks();

        audioTrack.simulate("canplaythrough");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'AUDIO_IS_READY' });
        jest.clearAllMocks();

        audioTrack.simulate("seeking");
        expect(dispatchSpy).not.toHaveBeenCalledWith({ type: 'AUDIO_IS_NOT_READY' });
        jest.clearAllMocks();

        audioTrack.simulate("seeked");
        expect(dispatchSpy).not.toHaveBeenCalledWith({ type: 'AUDIO_IS_READY' });
        jest.clearAllMocks();

        audioTrack.simulate("play");
        expect(dispatchSpy).not.toHaveBeenCalledWith({ type: 'AUDIO_IS_READY' });
        jest.clearAllMocks();

        audioTrack.simulate("loadedmetadata");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_DURATION', payload: { duration: 120 } });
        jest.clearAllMocks();

        audioTrackInstance.audio = {
            duration: 120,
            currentTime: 120
        }

        audioTrack.simulate("waiting");
        expect(dispatchSpy).not.toHaveBeenCalledWith({ type: 'AUDIO_IS_NOT_READY' });
        jest.clearAllMocks();

        initState.hasVinyl = false;
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        audioTrack.simulate("loadedmetadata");
        expect(dispatchSpy).not.toHaveBeenCalledWith({ type: 'UPDATE_DURATION', payload: { duration: 120 } });
        jest.clearAllMocks();
    });
});

