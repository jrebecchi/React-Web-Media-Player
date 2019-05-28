import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import createTestStore from './Utils';
import Adapter from 'enzyme-adapter-react-16';
import ReactWebMediaPlayer from '../../src/ReactWebMediaPlayer';
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
            />
        );

        videoPlayer.simulate('click');
        // to test if the an INIT_ACTION has been launched
        expect(dispatchSpy).toHaveBeenCalled();

    });

});