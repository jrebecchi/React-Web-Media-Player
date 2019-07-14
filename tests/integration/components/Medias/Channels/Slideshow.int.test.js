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
        initTime: new Date("Tue Jan 12 21:33:28 +0000 2010")
    };

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });

    it('Slideshow - load', () => {
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
        store.getState().slideshow[4].element.dispatchEvent(e);
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SLIDESHOW_IS_READY' });
    });

    it('Slideshow - hasEnoughBuffered', () => {
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const slideshowProvider = mount(
            <Provider store={store}>
                <Slideshow />
            </Provider>
        );
        const slideshowTrack = slideshowProvider.find("Slideshow");
        const slideshowTrackInstance = slideshowTrack.instance();
        slideshowTrackInstance.load(0);

        const e = new Event('load');
        store.getState().slideshow[0].element.dispatchEvent(e);
        expect(slideshowTrackInstance.hasEnoughBuffered(0)).toBeFalsy();
        expect(slideshowTrackInstance.hasEnoughBuffered(2)).toBeFalsy();
        expect(slideshowTrackInstance.hasEnoughBuffered(29)).toBeFalsy();

        store.getState().slideshow[1].element.dispatchEvent(e);
        store.getState().slideshow[2].element.dispatchEvent(e);
        store.getState().slideshow[4].element.dispatchEvent(e);
        store.getState().slideshow[5].element.dispatchEvent(e);
        expect(slideshowTrackInstance.hasEnoughBuffered(0)).toBeTruthy();
        expect(slideshowTrackInstance.hasEnoughBuffered(2)).toBeTruthy();
        expect(slideshowTrackInstance.hasEnoughBuffered(12)).toBeFalsy();
        expect(slideshowTrackInstance.hasEnoughBuffered(29)).toBeFalsy();
    });

    it('Slideshow - changeTime', () => {
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const slideshowProvider = mount(
            <Provider store={store}>
                <Slideshow />
            </Provider>
        );
        const slideshowTrack = slideshowProvider.find("Slideshow");
        const slideshowTrackInstance = slideshowTrack.instance();
        slideshowTrackInstance.load(0);

        const e = new Event('load');
        store.getState().slideshow[0].element.dispatchEvent(e);
        slideshowTrackInstance.changeTime(24);
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SLIDESHOW_IS_NOT_READY' });

        store.getState().slideshow[1].element.dispatchEvent(e);
        store.getState().slideshow[2].element.dispatchEvent(e);
        store.getState().slideshow[3].element.dispatchEvent(e);
        store.getState().slideshow[4].element.dispatchEvent(e);
        store.getState().slideshow[5].element.dispatchEvent(e);
        store.getState().slideshow[6].element.dispatchEvent(e);
        slideshowTrackInstance.changeTime(24);
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SLIDESHOW_IS_READY' });
    });

    it('Slideshow - play', () => {
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const slideshowProvider = mount(
            <Provider store={store}>
                <Slideshow />
            </Provider>
        );
        const slideshowTrack = slideshowProvider.find("Slideshow");
        const slideshowTrackInstance = slideshowTrack.instance();
        slideshowTrackInstance.load(0);

        const e = new Event('load');
        store.getState().slideshow[0].element.dispatchEvent(e);
        slideshowTrackInstance.changeTime(24);
        slideshowTrackInstance.pause();
        slideshowTrackInstance.play();
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SLIDESHOW_IS_NOT_READY' });

        store.getState().slideshow[1].element.dispatchEvent(e);
        store.getState().slideshow[2].element.dispatchEvent(e);
        store.getState().slideshow[3].element.dispatchEvent(e);
        store.getState().slideshow[4].element.dispatchEvent(e);
        store.getState().slideshow[5].element.dispatchEvent(e);
        store.getState().slideshow[6].element.dispatchEvent(e);
        slideshowTrackInstance.changeTime(24);
        slideshowTrackInstance.pause();
        slideshowTrackInstance.play();
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SLIDESHOW_IS_READY' });
    });

    it('Slideshow - addPortionBuffered', () => {

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const slideshowProvider = mount(
            <Provider store={store}>
                <Slideshow />
            </Provider>
        );
        const slideshowTrack = slideshowProvider.find("Slideshow");
        const slideshowTrackInstance = slideshowTrack.instance();
        slideshowTrackInstance.addPortionBuffered(10, 14);
        expect(slideshowTrackInstance.timeRangeBuffered(10)).toBe(14);
        slideshowTrackInstance.addPortionBuffered(8, 14);
        expect(slideshowTrackInstance.timeRangeBuffered(8)).toBe(14);
        slideshowTrackInstance.addPortionBuffered(15, 20);
        expect(slideshowTrackInstance.timeRangeBuffered(8)).toBe(14);
        slideshowTrackInstance.addPortionBuffered(8, 20);
        expect(slideshowTrackInstance.timeRangeBuffered(8)).toBe(20);
        slideshowTrackInstance.addPortionBuffered(24, 27);
        expect(slideshowTrackInstance.timeRangeBuffered(8)).toBe(20);
        slideshowTrackInstance.addPortionBuffered(20, 24);
        expect(slideshowTrackInstance.timeRangeBuffered(8)).toBe(27);
        slideshowTrackInstance.addPortionBuffered(4, 8);
        expect(slideshowTrackInstance.timeRangeBuffered(4)).toBe(27);

    });

    it('Slideshow - timeRangeBuffered', () => {
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const slideshowProvider = mount(
            <Provider store={store}>
                <Slideshow />
            </Provider>
        );
        const slideshowTrack = slideshowProvider.find("Slideshow");
        const slideshowTrackInstance = slideshowTrack.instance();
        slideshowTrackInstance.load(0);

        const e = new Event('load');
        store.getState().slideshow[0].element.dispatchEvent(e);
        expect(slideshowTrackInstance.timeRangeBuffered(0)).toBe(1);
        expect(slideshowTrackInstance.timeRangeBuffered(2)).toBe(2);
        expect(slideshowTrackInstance.timeRangeBuffered(29)).toBe(29);

        store.getState().slideshow[1].element.dispatchEvent(e);
        store.getState().slideshow[2].element.dispatchEvent(e);
        store.getState().slideshow[4].element.dispatchEvent(e);
        store.getState().slideshow[5].element.dispatchEvent(e);
        store.getState().slideshow[6].element.dispatchEvent(e);
        expect(slideshowTrackInstance.timeRangeBuffered(0)).toBe(12);
        expect(slideshowTrackInstance.timeRangeBuffered(2)).toBe(12);
        expect(slideshowTrackInstance.timeRangeBuffered(16)).toBe(28);
        expect(slideshowTrackInstance.timeRangeBuffered(29)).toBe(29);
    });

    it('Slideshow - when reinit player props call load to restart audio state', () => {
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const slideshowProvider = mount(
            <Provider store={store}>
                <Slideshow />
            </Provider>
        );
        const slideshowTrack = slideshowProvider.find("Slideshow");
        const slideshowTrackInstance = slideshowTrack.instance();

        const initState2 = {
            ...initState,
            initTime: new Date()
        }
        
        store.dispatch({ type: "INIT_STATE", payload: { state: initState2 } });
        expect(slideshowTrackInstance.timerFunction).toBeFalsy();
        expect(slideshowTrackInstance.currentTime).toBe(0);
    });

    it('Slideshow - updateView', () => {
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const slideshowProvider = mount(
            <Provider store={store}>
                <Slideshow />
            </Provider>
        );
        const slideshowTrack = slideshowProvider.find("Slideshow");
        const slideshowTrackInstance = slideshowTrack.instance();
        slideshowTrackInstance.load(0);

        const e = new Event('load');
        store.getState().slideshow[0].element.dispatchEvent(e);
        store.getState().slideshow[1].element.dispatchEvent(e);
        store.getState().slideshow[2].element.dispatchEvent(e);
        store.getState().slideshow[3].element.dispatchEvent(e);
        store.getState().slideshow[4].element.dispatchEvent(e);
        store.getState().slideshow[5].element.dispatchEvent(e);
        store.getState().slideshow[6].element.dispatchEvent(e);
        jest.clearAllMocks();

        slideshowTrackInstance.currentTime = 0;
        slideshowTrackInstance.updateView();
        expect(dispatchSpy).toHaveBeenCalledWith({
            type: 'UPDATE_IMAGE_DISPLAYED',
            payload: { 
                imageDisplayed: {
                    element: expect.anything(),
                    endTime: 1, 
                    img: "https://nusid.net/slide1.jpg"
                }
            }
        });

        slideshowTrackInstance.currentTime = 10;
        slideshowTrackInstance.updateView();
        expect(dispatchSpy).toHaveBeenCalledWith({
            type: 'UPDATE_IMAGE_DISPLAYED',
            payload: { 
                imageDisplayed: {
                    element: expect.anything(),
                    endTime: 12, 
                    img: "https://nusid.net/slide3.jpg"
                }
            }
        });

        slideshowTrackInstance.currentTime = 27;
        slideshowTrackInstance.updateView();
        expect(dispatchSpy).toHaveBeenCalledWith({
            type: 'UPDATE_IMAGE_DISPLAYED',
            payload: { 
                imageDisplayed: {
                    element: expect.anything(),
                    endTime: 28, 
                    img: "https://nusid.net/slide7.jpg"
                }
            }
        });
    });

    it('Slideshow - adaptImageToWidth & adaptImageToHeight', () => {
        const specificInitState = {
            ...initState,
            imageDisplayed: {
                element: {
                    width: 250,
                    height: 250
                }
            }
        }
        store.dispatch({ type: "INIT_STATE", payload: { state: specificInitState } });

        const slideshowProvider = mount(
            <Provider store={store}>
                <Slideshow />
            </Provider>
        );
        const slideshowTrack = slideshowProvider.find("Slideshow");
        const slideshowTrackInstance = slideshowTrack.instance();
        
        let style = slideshowTrackInstance.adaptImageToHeight(1000, 500);
        expect(style.marginLeft).toBe("250px");
        expect(style.width).toBe("500px");
        expect(style.height).toBe("100%");

        style = slideshowTrackInstance.adaptImageToWidth(500, 1000)
        expect(style.marginTop).toBe("250px");
        expect(style.width).toBe("100%");   
        expect(style.height).toBe("500px");   
    });

    it('Slideshow - refresh', () => {
        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const slideshowProvider = mount(
            <Provider store={store}>
                <Slideshow />
            </Provider>
        );
        const slideshowTrack = slideshowProvider.find("Slideshow");
        const slideshowTrackInstance = slideshowTrack.instance();
        slideshowTrackInstance.load(0);

        const e = new Event('load');
        store.getState().slideshow[0].element.dispatchEvent(e);

        store.getState().slideshow[2].element.dispatchEvent(e);
        store.getState().slideshow[3].element.dispatchEvent(e);
        store.getState().slideshow[4].element.dispatchEvent(e);
        store.getState().slideshow[5].element.dispatchEvent(e);
        store.getState().slideshow[6].element.dispatchEvent(e);
        jest.clearAllMocks();

        slideshowTrackInstance.currentTime = 0;
        slideshowTrackInstance.tempTime = new Date();
        slideshowTrackInstance.refresh();
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SLIDESHOW_IS_NOT_READY' });
        
        slideshowTrackInstance.currentTime = 10;
        slideshowTrackInstance.refresh();
        expect(dispatchSpy).toHaveBeenCalledWith({
            type: 'UPDATE_IMAGE_DISPLAYED',
            payload: { 
                imageDisplayed: {
                    element: expect.anything(),
                    endTime: 12, 
                    img: "https://nusid.net/slide3.jpg"
                }
            }
        });

        slideshowTrackInstance.currentTime = 29;
        slideshowTrackInstance.tempTime = new Date();
        slideshowTrackInstance.refresh();
        expect(slideshowTrackInstance.currentTime).toBe(28);


    });
});

