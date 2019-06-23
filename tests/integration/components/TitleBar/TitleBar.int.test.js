import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import TitleBar from '../../../../src/components/TitleBar/TitleBar';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - TitleBar', () => {

    let store;
    let dispatchSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });


    it('TitleBar event listeners', () => {
        const titleBar = mount(
            <Provider store={store}>
                <TitleBar />
            </Provider>
        );

        titleBar.simulate("click");
    });

    it('TitleBar link property', () => {
        const initState = {
            link: "test-url",
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });
        const testButton = mount(
            <Provider store={store}>
                <TitleBar />
            </Provider>
        );

        expect(testButton.html().includes('href="test-url"')).toBeTruthy();

    });
});