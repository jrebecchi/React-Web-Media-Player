import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import MenuBar from '../../../../src/components/MenuBar/MenuBar';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - MenuBar', () => {

    let store;

    beforeEach(() => {
        ({ store } = createTestStore());
    });

    it('MenuBar renders volume Control for video player', () => {
        const initState = {
            hasVideo: true,
            hasAudio: false,
            hasSlideshow: false,
            allowMouseLeaveVolumeSlider: true,
            logo: false,
            buttons: false,
            allowFullFrame: true,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const menuBar = mount(
            <Provider store={store}>
                <MenuBar />
            </Provider>
        );
        const volumeControl =  menuBar.find("VolumeControl")
        expect(volumeControl.length).toBe(1);

        const previousButton =  menuBar.find("PreviousButton")
        expect(previousButton.length).toBe(0);

        const nextButton =  menuBar.find("NextButton")
        expect(nextButton.length).toBe(0);
    });

    it('MenuBar renders volume Control for audio player', () => {
        const initState = {
            hasVideo: false,
            hasAudio: true,
            hasSlideshow: false,
            allowMouseLeaveVolumeSlider: true,
            logo: false,
            buttons: false,
            allowFullFrame: true,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const menuBar = mount(
            <Provider store={store}>
                <MenuBar />
            </Provider>
        );
        const volumeControl =  menuBar.find("VolumeControl")
        expect(volumeControl.length).toBe(1);

        const previousButton =  menuBar.find("PreviousButton")
        expect(previousButton.length).toBe(0);

        const nextButton =  menuBar.find("NextButton")
        expect(nextButton.length).toBe(0);
    });

    it('MenuBar renders next & previous buttons for slidehow', () => {
        const initState = {
            hasVideo: false,
            hasAudio: false,
            hasSlideshow: true,
            allowMouseLeaveVolumeSlider: true,
            logo: false,
            buttons: false,
            allowFullFrame: true,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const menuBar = mount(
            <Provider store={store}>
                <MenuBar />
            </Provider>
        );
        const volumeControl =  menuBar.find("VolumeControl")
        expect(volumeControl.length).toBe(0);

        const previousButton =  menuBar.find("PreviousButton")
        expect(previousButton.length).toBe(1);

        const nextButton =  menuBar.find("NextButton")
        expect(previousButton.length).toBe(1);
    });

    it('MenuBar renders logo', () => {
        const initState = {
            hasVideo: false,
            hasAudio: false,
            hasSlideshow: true,
            allowMouseLeaveVolumeSlider: true,
            logo: {img: "test-image.jpg", href:"test-href"},
            buttons: false,
            allowFullFrame: true,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const menuBar = mount(
            <Provider store={store}>
                <MenuBar />
            </Provider>
        );
        const logoButton =  menuBar.find("LogoButton")
        expect(logoButton.length).toBe(1);
    });

    it('MenuBar renders buttons', () => {
        const initState = {
            hasVideo: false,
            hasAudio: false,
            hasSlideshow: true,
            allowMouseLeaveVolumeSlider: true,
            logo: false,
            buttons: [
                {img: "test-image1.jpg", href:"test-href1"},
                {img: "test-image2.jpg", href:"test-href2"}
            ],
            allowFullFrame: true,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const menuBar = mount(
            <Provider store={store}>
                <MenuBar />
            </Provider>
        );
        const buttons =  menuBar.find("Button")
        expect(buttons.length).toBe(2);
    });

    it('MenuBar renders Fullscreen', () => {
        const initState = {
            hasVideo: false,
            hasAudio: false,
            hasSlideshow: true,
            allowMouseLeaveVolumeSlider: true,
            logo: false,
            buttons: false,
            allowFullFrame: true,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const menuBar = mount(
            <Provider store={store}>
                <MenuBar />
            </Provider>
        );
        const buttons =  menuBar.find("FullscreenButton")
        expect(buttons.length).toBe(1);
    });

    it('MenuBar does not render Fullscreen button when not allowed', () => {
        const initState = {
            hasVideo: false,
            hasAudio: false,
            hasSlideshow: true,
            allowMouseLeaveVolumeSlider: true,
            logo: false,
            buttons: false,
            allowFullFrame: false,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const menuBar = mount(
            <Provider store={store}>
                <MenuBar />
            </Provider>
        );
        const buttons =  menuBar.find("FullscreenButton")
        expect(buttons.length).toBe(0);
    });

    it('MenuBar - block click events', () => {

        const initState = {
            hasVideo: false,
            hasAudio: false,
            hasSlideshow: true,
            allowMouseLeaveVolumeSlider: true,
            logo: false,
            buttons: false,
            allowFullFrame: false,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const menuBarProvider = mount(
            <Provider store={store}>
                <MenuBar />
            </Provider>
        );

        const menuBar = menuBarProvider.find("MenuBar");
        const menuBarInstance = menuBar.instance();
        const stopPropagation = jest.fn();
        menuBarInstance.handleClick({stopPropagation: stopPropagation})

        expect(stopPropagation).toHaveBeenCalled();
    });
});