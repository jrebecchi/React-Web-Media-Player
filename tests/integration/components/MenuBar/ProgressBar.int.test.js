import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import ProgressBar from '../../../../src/components/MenuBar/ProgressBar';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - ProgressBar', () => {

    let store;
    let dispatchSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });

    it('ProgressBar - highlight/unhighlight progress bar', () => {

        const initState = {
            timeRangeBuffered: 40,
            highlightProgressBar: false,
            currentTime: 20,
            duration: 100,
            progressBarLeftMargin: "20%",
            allowUnhighlightProgressBar: true,
            color: "blue",
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });


        const progressBar = mount(
            <Provider store={store}>
                <ProgressBar />
            </Provider>
        );

        expect(progressBar.html().includes('wmp-progress-bar-wrapper-highighted')).toBeFalsy();
        //show volume slider
        progressBar.simulate("mouseenter");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "HIGHLIGHT_PROGRESS_BAR" });

        expect(progressBar.html().includes('wmp-progress-bar-wrapper-highighted')).toBeTruthy();

        //hide volume slider
        progressBar.simulate("mouseleave");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "UNHIGHLIGHT_PROGRESS_BAR" });

        expect(progressBar.html().includes('wmp-progress-bar-wrapper-highighted')).toBeFalsy();
    });
    
    it('VolumeControl - slide volume scrubber button', () => {
        const initState = {
            volume: 1,
            isInitialized: true,
            pastVolume: 1,
            volumeSliderLeftMargin: "45%",
            showVolumeSlider: true,
            allowMouseLeaveVolumeSlider: true,
            muted: true
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const progressBarProvider = mount(
            <Provider store={store}>
                <ProgressBar />
            </Provider>
        );

        const progressBar = progressBarProvider.find("ProgressBar");

        //mouse down
        jest.clearAllMocks();
        progressBar.simulate("mousedown");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'CHANNELS_WAIT' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PREVENT_MENU_HIDING' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PREVENT_UNHIGHLIGHT_PROGRESS_BAR' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'USER_ACTIVE' })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_ASKED_TIME', payload: expect.anything() })

        document.elementFromPoint = jest.fn();

        jest.clearAllMocks();
        const progressBarrInstance = progressBar.instance();
        progressBarrInstance.moveScrubberButton({ clientX: 300, stopPropagation: jest.fn() })

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'USER_ACTIVE' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_ASKED_TIME', payload: expect.anything() })

        jest.clearAllMocks();
        progressBarrInstance.stopScrubberButton({ clientX: 330, clientY: 300, stopPropagation: jest.fn() })

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_ASKED_TIME', payload: expect.anything() })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'ALLOW_UNHIGHLIGHT_PROGRESS_BAR' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'ALLOW_MENU_HIDING' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'USER_ACTIVE' })
    });

    it('ProgressBar - update desired progress bar', () => {

        const initState = {
            timeRangeBuffered: 40,
            highlightProgressBar: false,
            currentTime: 20,
            duration: 100,
            progressBarLeftMargin: "20%",
            allowUnhighlightProgressBar: true,
            color: "blue",
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const progressBarProvider = mount(
            <Provider store={store}>
                <ProgressBar />
            </Provider>
        );

        const progressBar = progressBarProvider.find("ProgressBar");
        const progressBarrInstance = progressBar.instance();
        progressBarrInstance.progressBarDesired.style.width = "test value";

        progressBar.simulate("mousemove");
        expect(progressBarrInstance.progressBarDesired.style.width).not.toEqual("test value");

    });

    it('ProgressBar - block click events', () => {

        const initState = {
            timeRangeBuffered: 40,
            highlightProgressBar: false,
            currentTime: 20,
            duration: 100,
            progressBarLeftMargin: "20%",
            allowUnhighlightProgressBar: true,
            color: "blue",
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const progressBarProvider = mount(
            <Provider store={store}>
                <ProgressBar />
            </Provider>
        );

        const progressBar = progressBarProvider.find("ProgressBar");
        const progressBarrInstance = progressBar.instance();
        const stopPropagation = jest.fn();
        progressBarrInstance.handleClick({stopPropagation: stopPropagation})

        expect(stopPropagation).toHaveBeenCalled();
    });
});