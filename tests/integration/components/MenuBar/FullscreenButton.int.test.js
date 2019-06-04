import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import FullscreenButton from '../../../../src/components/MenuBar/FullscreenButton';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - FullscreenButton', () => {

    let store;
    let dispatchSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });


    it('FullscreenButton event listeners', () => {
        const initState = {
            isFullscreen: false
        }
        
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const testButton = mount(
            <Provider store={store}>
                <FullscreenButton />
            </Provider>
        );

        testButton.simulate("click");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "SWITCH_FULLSCREEN_STATE" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "USER_ACTIVE" });

    });

    it('FullscreenButton isFullscreen property - set false', () => {
        const initState = {
            isFullscreen: false
        }
        
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const testButton = mount(
            <Provider store={store}>
                <FullscreenButton />
            </Provider>
        );
        expect(testButton.html().includes('fullscreen-logo')).toBeTruthy();
    });

    it('FullscreenButton isFullscreen property - set false', () => {
        const initState = {
            isFullscreen: true
        }
        
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const testButton = mount(
            <Provider store={store}>
                <FullscreenButton />
            </Provider>
        );
        expect(testButton.html().includes('fullscreen-exit-logo')).toBeTruthy();
    });
});