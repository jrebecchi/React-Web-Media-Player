import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../Utils';
import Adapter from 'enzyme-adapter-react-16';
import Container from '../../../src/components/Container';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });



describe('Integration tests - Container', () => {

    let store;
    let dispatchSpy;
    let await4Seconds = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 4000);
        });
    }

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });


    it('Container event listeners', (done) => {
        const initState = {
            timeLastUserAction: undefined,
            width: 500,
            height: 500,
            thumbnail: "img-link",
            hasVideo: true,
            hasAudio: false,
            hasSlideshow: false,
            isInitialized: false,
            isFullscreen: false,
            showMenus: false,
            isPlaying: false,
            allowMenuHiding: true,
            isLoading: false,
            isFullscreenActivated: false,
            autoplay: false,
            style: false,
            id: "id-player",
            isTestEnvironment: false,
            volume: 1
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const container = mount(
            <Provider store={store}>
                <Container />
            </Provider>
        );

        container.simulate("mouseenter");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "HIGHLIGHT_PLAYER" });

        container.simulate("mouseleave");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "UNHIGHLIGHT_PLAYER" });

        container.simulate("click");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "INITIALIZE_PLAYER" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "PLAY" });

        container.simulate("mouseenter");
        expect(dispatchSpy).not.toHaveBeenLastCalledWith({ type: "HIGHLIGHT_PLAYER" });

        container.simulate("mousemove");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "USER_ACTIVE" });

        container.simulate("mouseleave");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "HIDE_MENUS" });

        container.simulate("click");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "PREVENT_MENU_HIDING" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "PAUSE" });

        container.simulate("click");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "ALLOW_MENU_HIDING" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "PLAY" });
        done();
        await4Seconds().then(() => {
            expect(dispatchSpy).toHaveBeenLastCalledWith({ type: "HIDE_MENUS" });
            done();
        });

    });

});