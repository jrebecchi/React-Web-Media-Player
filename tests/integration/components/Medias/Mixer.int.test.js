import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import Mixer from '../../../../src/components/Medias/Mixer';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - Mixer', () => {

    let store;
    let dispatchSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });

    it('Mixer - Video channel', () => {

        const initState = {
            channelsWait: false,
            timeRangeBuffered: 0,
            askNextImage: null,
            askPreviousImage: null,
            volume: 1,
            hasVideo: true,
            isVideoReady: false,
            hasAudio: false,
            isAudioReady: false,
            hasSlideshow: false,
            isSlideshowReady: false,
            isInitialized: false,
            currentTime: 0,
            askedTime: null,
            isPlaying: false,
            duration: 0,
            hasVinyl: false,
            isVinylReady: false,
            isReadingTerminated: false,
            allowUnhighlightProgressBar: true,
            autoplay: false,
            muted: false,
            isFullscreenActivated: false,
            video: "https://nusid.net/video.mp4",
            width: 560,
            height: 315,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });


        const progressBar = mount(
            <Provider store={store}>
                <Mixer />
            </Provider>
        );
        //Initialize player & load Video
        store.dispatch({ type: 'INITIALIZE_PLAYER' });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "LOADING"});
        jest.clearAllMocks();
        
        //Start playing 
        store.dispatch({ type: 'UPDATE_DURATION', payload: { duration: 596.427756 }  });
        store.dispatch({ type: 'UPDATE_VIDEO_WIDTH', payload: { videoWidth: 500 } });
        store.dispatch({ type: 'UPDATE_VIDEO_HEIGHT', payload: { videoHeight: 200 } });
        
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: expect.anything() });
        jest.clearAllMocks();

        //mute
        //store.dispatch({ type: 'MUTE', payload: { duration: 120 }  });

        //Change time
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 110 } });
        
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_CURRENT_TIME', payload: { currentTime: 110 } });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: "isTreated" } });
        jest.clearAllMocks();
        
        //Terminate reading
        store.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 596.427756 } });
        
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'READING_TERMINATED'});
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'PAUSE'});
        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SHOW_MENUS'});
        jest.clearAllMocks();

    });
});