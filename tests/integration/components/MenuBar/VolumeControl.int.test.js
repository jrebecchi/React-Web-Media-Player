import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import VolumeControl from '../../../../src/components/MenuBar/VolumeControl';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - VolumeControl', () => {

    let store;
    let dispatchSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });


    it('VolumeControl - mute', () => {

        const initState = {
            volume: 1,
            isInitialized: true,
            pastVolume: 1,
            volumeSliderLeftMargin: "80%",
            showVolumeSlider: false,
            allowMouseLeaveVolumeSlider: true,
            muted: false
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });


        const volumeController = mount(
            <Provider store={store}>
                <VolumeControl />
            </Provider>
        );

        expect(volumeController.html().includes('class="volume-up-logo"')).toBeTruthy();


        volumeController.find('[className="wmp-tool-button"]').simulate("click");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "USER_ACTIVE" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_VOLUME', payload: { volume: 0 } });
        expect(volumeController.html().includes('class="volume-off-logo"')).toBeTruthy();
    });

    it('VolumeControl - unmute', () => {

        const initState = {
            volume: 1,
            isInitialized: true,
            pastVolume: 1,
            volumeSliderLeftMargin: "5%",
            showVolumeSlider: false,
            allowMouseLeaveVolumeSlider: true,
            muted: true
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });


        const volumeController = mount(
            <Provider store={store}>
                <VolumeControl />
            </Provider>
        );

        expect(volumeController.html().includes('class="volume-off-logo"')).toBeTruthy();


        volumeController.find('[className="wmp-tool-button"]').simulate("click");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "USER_ACTIVE" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UNMUTE' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_VOLUME', payload: { volume: 1 } });
        expect(volumeController.html().includes('class="volume-up-logo"')).toBeTruthy();
    });

    it('VolumeControl - set previous volume', () => {

        const initState = {
            volume: 0,
            isInitialized: true,
            pastVolume: 0.4,
            volumeSliderLeftMargin: "45%",
            showVolumeSlider: false,
            allowMouseLeaveVolumeSlider: true,
            muted: false
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });


        const volumeController = mount(
            <Provider store={store}>
                <VolumeControl />
            </Provider>
        );

        expect(volumeController.html().includes('class="volume-off-logo"')).toBeTruthy();

        volumeController.find('[className="wmp-tool-button"]').simulate("click");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "USER_ACTIVE" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_VOLUME', payload: { volume: 0.4 } });
        expect(volumeController.html().includes('class="volume-down-logo"')).toBeTruthy();
    });

    it('VolumeControl - show/hide volume slider', () => {

        const initState = {
            volume: 0,
            isInitialized: true,
            pastVolume: 0.4,
            volumeSliderLeftMargin: "45%",
            showVolumeSlider: false,
            allowMouseLeaveVolumeSlider: true,
            muted: false
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });


        const volumeController = mount(
            <Provider store={store}>
                <VolumeControl />
            </Provider>
        );

        expect(volumeController.html().includes('class="wmp-tool-button wmp-volume-slider"')).toBeFalsy();
        //show volume slider
        volumeController.find('[className="wmp-tool-button"]').simulate("mouseenter");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "SHOW_VOLUME_SLIDER" });
        expect(volumeController.html().includes('class="wmp-tool-button wmp-volume-slider"')).toBeTruthy();

        //hide volume slider
        volumeController.simulate("mouseleave");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "HIDE_VOLUME_SLIDER" });
        expect(volumeController.html().includes('class="wmp-tool-button wmp-volume-slider"')).toBeFalsy();
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


        const volumeControllerProvider = mount(
            <Provider store={store}>
                <VolumeControl />
            </Provider>
        );

        const volumeController = volumeControllerProvider.find("VolumeControl");

        //mouse down
        jest.clearAllMocks();
        volumeController.find('[className="wmp-tool-button wmp-volume-slider"]').simulate("mousedown");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'USER_ACTIVE' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PREVENT_MENU_HIDING' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PREVENT_MOUSE_LEAVE_VOLUME_SLIDER' })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_VOLUME', payload: expect.anything() })

        document.elementFromPoint = jest.fn();

        jest.clearAllMocks();
        const volumeControllerInstance = volumeController.instance();
        volumeControllerInstance.animateVolumeScrubberButton({ clientX: 300, stopPropagation: jest.fn() })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PREVENT_MENU_HIDING' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PREVENT_MOUSE_LEAVE_VOLUME_SLIDER' })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_VOLUME', payload: expect.anything() })
        

        jest.clearAllMocks();
        volumeControllerInstance.moveVolumeScrubberButton({ clientX: 310, stopPropagation: jest.fn() })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_VOLUME', payload: expect.anything() })

        jest.clearAllMocks();
        volumeControllerInstance.stopVolumeScrubberButton({ clientX: 330, clientY: 300, stopPropagation: jest.fn() })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_VOLUME', payload: expect.anything() })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'ALLOW_MOUSE_LEAVE_VOLUME_SLIDER' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'ALLOW_MENU_HIDING' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'USER_ACTIVE' })
    });

    it('VolumeControl - calculate left margin on component mount', () => {

        const initState = {
            volume: 0,
            isInitialized: true,
            pastVolume: 0.4,
            volumeSliderLeftMargin: "calculateMe!",
            showVolumeSlider: false,
            allowMouseLeaveVolumeSlider: true,
            muted: false
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const volumeController = mount(
            <Provider store={store}>
                <VolumeControl />
            </Provider>
        );

        expect(dispatchSpy).toHaveBeenCalledWith({ type: "UPDATE_VOLUME_SLIDER_LEFT_MARGIN", payload: expect.anything() });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "HIDE_VOLUME_SLIDER" });

    });
});