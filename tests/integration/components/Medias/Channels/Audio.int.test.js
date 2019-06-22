import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../../Utils';
import Adapter from 'enzyme-adapter-react-16';
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
        const initState  = {
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
                0:{start:0, end:5},
                1:{start:30, end:40},
                2:{start:60, end:111},
                3:{start:115, end:120},
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
});