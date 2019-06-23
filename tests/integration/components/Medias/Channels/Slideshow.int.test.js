import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import Slideshow from '../../../../../src/components/Medias/Channels/Slideshow';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - Slideshow', () => {

    let store;
    let dispatchSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });

    it('Slideshow - load', () => {

        const initState = {
            imageDisplayed: null,
            isFullscreenActivated: false,
            isSlideshowReady: false,
            slideshow: [
                { img: "https://nusid.net/slide1.jpg", endTime: 1.0 },
                { img: "https://nusid.net/slide2.jpg", endTime: 8.0 },
                { img: "https://nusid.net/slide3.jpg", endTime: 12.0 },
                { img: "https://nusid.net/slide4.jpg", endTime: 16.0 },
                { img: "https://nusid.net/slide5.jpg", endTime: 20.0 },
                { img: "https://nusid.net/slide6.jpg", endTime: 24.0 },
                { img: "https://nusid.net/slide7.jpg", endTime: 28.0 }
            ],
            duration: 28,
            currentTime: 0,
            isFullScreenActivated: false,
            width: 500,
            height: 315,
        };
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const slideshowProvider = mount(
            <Provider store={store}>
                <Slideshow />
            </Provider>
        );
        const slideshowTrack = slideshowProvider.find("Slideshow");
        const slideshowTrackInstance = slideshowTrack.instance();
        slideshowTrackInstance.load(0);
        expect(dispatchSpy).toHaveBeenCalledWith({ 
            type: 'ADD_IMAGE', 
            payload: { index: expect.anything(), image: expect.anything() } 
        });
        jest.clearAllMocks();

        
        const e = new Event('load');
        store.getState().slideshow[0].element.dispatchEvent(e);
        expect(dispatchSpy).not.toHaveBeenCalledWith({ type: 'SLIDESHOW_IS_READY' });
        store.getState().slideshow[1].element.dispatchEvent(e);
        store.getState().slideshow[2].element.dispatchEvent(e);
        store.getState().slideshow[3].element.dispatchEvent(e);
        store.getState().slideshow[3].element.dispatchEvent(e);
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SLIDESHOW_IS_READY' });
    });
});

