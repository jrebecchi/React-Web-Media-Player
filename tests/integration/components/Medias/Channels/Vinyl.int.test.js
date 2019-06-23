import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import Vinyl from '../../../../../src/components/Medias/Channels/Vinyl';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - Vinyl', () => {

    let store;
    let dispatchSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });

    it('Vinyl - load', () => {
        const initState = {
            isInitialized: true,
            isFullscreenActivated: true,
            vinyl: "image-link.jpg",
            isVinylReady: false,
            currentTime: 0,
            width: 515,
            height: 320,
            rpm: 10,
        }
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const vinylProvider = mount(
            <Provider store={store}>
                <Vinyl />
            </Provider>
        );
        
        const vinylTrack = vinylProvider.find("Vinyl");
        const vinylTrackInstance = vinylTrack.instance();
        vinylTrackInstance.load(0);

        const e = new Event('load');
        vinylTrackInstance.vinyl.dispatchEvent(e);
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'VINYL_IS_READY' });   
    });

    it('Vinyl - adaptImageToWidth & adaptImageToHeight', () => {
        const initState = {
            isInitialized: true,
            isFullscreenActivated: true,
            vinyl: "image-link.jpg",
            isVinylReady: false,
            currentTime: 0,
            width: 250,
            height: 250,
            rpm: 10,
        }
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const vinylProvider = mount(
            <Provider store={store}>
                <Vinyl />
            </Provider>
        );
        
        const vinylTrack = vinylProvider.find("Vinyl");
        const vinylTrackInstance = vinylTrack.instance();
        vinylTrackInstance.vinyl = {
            width: 250,
            height: 250
        }
        
        let style = vinylTrackInstance.adaptImageToHeight(1000, 500);
        expect(style.marginLeft).toBe("250px");
        expect(style.width).toBe("500px");
        expect(style.height).toBe("100%");

        style = vinylTrackInstance.adaptImageToWidth(500, 1000)
        expect(style.marginTop).toBe("250px");
        expect(style.width).toBe("100%");   
        expect(style.height).toBe("500px");   
    });

    it('Vinyl - render', () => {
        const initState = {
            isInitialized: true,
            isFullscreenActivated: true,
            vinyl: "image-link.jpg",
            isVinylReady: true,
            currentTime: 0,
            width: 500,
            height: 250,
            rpm: 0,
        }
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const vinylProvider = mount(
            <Provider store={store}>
                <Vinyl />
            </Provider>
        );
        
        const vinylTrack = vinylProvider.find("Vinyl");
        const vinylTrackInstance = vinylTrack.instance();
        vinylTrackInstance.vinyl = {
            width: 500,
            height: 250
        }
        expect(vinylTrackInstance.render().props.children[1].props.style.width).toBe("100%");
        expect(vinylTrackInstance.render().props.children[1].props.style.height).toBe("512px");
    });
});

