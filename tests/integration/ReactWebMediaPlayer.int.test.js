import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import createTestStore from './Utils';
import Adapter from 'enzyme-adapter-react-16';
import ReactWebMediaPlayer from '../../src/ReactWebMediaPlayer';
import Container from '../../src/components/Container';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - Video Player', () => {
    let store;
    let dispatchSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });

    it('Launch Video Player', () => {

        const videoPlayer = shallow(
            <ReactWebMediaPlayer
                title="Video Player"
                thumbnail="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
                video="https://nusid.net/video.mp4"
                width="560"
                height="315"
                logo={{ img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Arte-Logo.svg/1280px-Arte-Logo.svg.png", href: "http://zrte.fr" }}
                color="rgb(222, 119, 18)"
                store={store}
                id="video-player-id"
                volume="0.8"
                allowFullFrame={true}
                style={{ marginTop: "20px" }}
                isTestEnvironment={true}
                muted={false}
            />
        );

        // to test if the an INIT_ACTION has been launched
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "INIT_STATE", payload: expect.anything() });

    });

    it('Instantiation Error - no property', () => {
        try {
            shallow(
                <ReactWebMediaPlayer
                />
            )
        } catch (e) {
            expect(e.message).toBe("Combination impossible");
        }
    });

    it('Instantiation Error - audio & video impossible', () => {
        try {
            shallow(
                <ReactWebMediaPlayer
                    video="https://nusid.net/video.mp4"
                    audio="https://nusid.net/audio.mp3"
                />
            )
        } catch (e) {
            expect(e.message).toBe("Combination impossible");
        }
    });

    it('Instantiation Error - button without image', () => {
        try {
            shallow(
                <ReactWebMediaPlayer
                    title="Video Player"
                    thumbnail="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
                    video="https://nusid.net/video.mp4"
                    width="560"
                    height="315"
                    buttons = {[{toto: "tata"}]}
                />
            )
        } catch (e) {
            expect(e.message).toBe("You need to specify the img property of each button");
        }
    });

    it('Instantiation Error - slideshow no endTime', () => {
        try {
            shallow(
                <ReactWebMediaPlayer
                    title="Video Player"
                    thumbnail="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
                    slideshow = {
                        [{
                          img: "https://nusid.net/slide1.jpg",
                        }]
                    }
                />
            )
        } catch (e) {
            expect(e.message).toBe("No time specified for slideshow");
        }
    });

    it('Instantiation Error - vinyl no image', () => {
        try {
            shallow(
                <ReactWebMediaPlayer
                    title="Video Player"
                    thumbnail="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
                    audio="https://nusid.net/audio.mp3"
                    vinyl = {{
                        toto: "tata"
                    }}
                />
            )
        } catch (e) {
            expect(e.message).toBe("Please pass an image link through the img property of the vinyl option");
        }
    });

});