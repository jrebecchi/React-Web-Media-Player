import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import PlayButton from '../../../../src/components/MenuBar/PlayButton';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - PlayButton', () => {

    let store;
    let dispatchSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });


    it('PlayButton - click & play', () => {

        const initState = {
            isPlaying: false,
            isReadingTerminated: false,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });


        const testButton = mount(
            <Provider store={store}>
                <PlayButton />
            </Provider>
        );
        
        expect(testButton.html().includes('class="play-logo"')).toBeTruthy();

        
        testButton.simulate("click");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "USER_ACTIVE" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "PLAY" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "ALLOW_MENU_HIDING" });
        
    });

    it('PlayButton - click & pause', () => {

        const initState = {
            isPlaying: true,
            isReadingTerminated: false,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });


        const testButton = mount(
            <Provider store={store}>
                <PlayButton />
            </Provider>
        );

        expect(testButton.html().includes('class="pause-logo"')).toBeTruthy();


        testButton.simulate("click");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "USER_ACTIVE" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "PREVENT_MENU_HIDING" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "PAUSE" });

    });

    it('PlayButton - click & replay', () => {

        const initState = {
            isPlaying: false,
            isReadingTerminated: true,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });


        const testButton = mount(
            <Provider store={store}>
                <PlayButton />
            </Provider>
        );

        expect(testButton.html().includes('class="replay-logo"')).toBeTruthy();

        testButton.simulate("click");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "USER_ACTIVE" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "UPDATE_ASKED_TIME", payload: expect.anything() });

    });
/*
    it('Button href  property', () => {
        const callBackSpy = jest.fn();

        const testButton = mount(
            <Provider store={store}>
                <Button href="test-url" callback={callBackSpy} />
            </Provider>
        );

        expect(testButton.html().includes('href="test-url"')).toBeTruthy();

    });

    it('Button callback  property', () => {
        const callBackSpy = jest.fn();

        const testButton = mount(
            <Provider store={store}>
                <Button callback={callBackSpy} />
            </Provider>
        );

        testButton.simulate("click");
        expect(callBackSpy).toHaveBeenCalled();
    });
*/
});