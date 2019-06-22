import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import Video from '../../../../../src/components/Medias/Channels/Video';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - Video', () => {

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

    it('Video - timeRangeBuffered', () => {
        const initState  = {
            duration: 120,
            audio: "audio-link",
            hasVinyl: true,
            muted: false
        };
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const videoProvider = mount(
            <Provider store={store}>
                <Video />
            </Provider>
        );
        const videoTrack = videoProvider.find("Video");
        const videoTrackInstance = videoTrack.instance();
        videoTrackInstance.video = {
            buffered: {
                0:{start:0, end:5},
                1:{start:30, end:40},
                2:{start:60, end:111},
                3:{start:115, end:120},
                length: 4,
                start: (i) => videoTrackInstance.video.buffered[i].start,
                end: (i) => videoTrackInstance.video.buffered[i].end
            }
        }
        expect(videoTrackInstance.timeRangeBuffered(0)).toBe(5);
        expect(videoTrackInstance.timeRangeBuffered(6)).toBe(6);
        expect(videoTrackInstance.timeRangeBuffered(59)).toBe(59);
        expect(videoTrackInstance.timeRangeBuffered(60)).toBe(111);
        expect(videoTrackInstance.timeRangeBuffered(111)).toBe(111);
        expect(videoTrackInstance.timeRangeBuffered(115)).toBe(120);
        expect(videoTrackInstance.timeRangeBuffered(120)).toBe(120);
        expect(videoTrackInstance.timeRangeBuffered(130)).toBe(130);

    });
});