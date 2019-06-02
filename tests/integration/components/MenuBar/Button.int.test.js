import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../../../../src/components/MenuBar/Button';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });



describe('Integration tests - Button', () => {

    let store;
    let dispatchSpy;

    beforeEach(() => {
        ({ store, dispatchSpy } = createTestStore());
    });


    it('Button event listeners', () => {

        const testButton = mount(
            <Provider store={store}>
                <Button />
            </Provider>
        );

        testButton.simulate("click");
        expect(dispatchSpy).toHaveBeenCalledWith({ type: "USER_ACTIVE" });

    });

    it('Button properties', () => {

        const testButton = mount(
            <Provider store={store}>
                <Button href="test-url" />
            </Provider>
        );

        expect(testButton.html().includes('href="test-url"')).toBeTruthy();

    });

});