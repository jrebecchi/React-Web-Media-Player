import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import NextButton from '../../../../src/components/MenuBar/NextButton';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - PreviousButton', () => {

    let store;
    let dispatchSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });


    it('PreviousButton event listeners', () => {
        const testButton = mount(
            <Provider store={store}>
                <NextButton />
            </Provider>
        );

        testButton.simulate("click");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "ASK_NEXT_IMAGE" });
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "USER_ACTIVE" });
    });

});