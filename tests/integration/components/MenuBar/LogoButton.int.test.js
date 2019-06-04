import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LogoButton from '../../../../src/components/MenuBar/LogoButton';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - LogoButton', () => {

    it('Button img property', () => {
        const testLogoButton = mount(
            <LogoButton img="test.img.jpg" />
        );
        expect(testLogoButton.html().includes('<img src="test.img.jpg"')).toBeTruthy();

    });

    it('Button href property', () => {
        const testButton = mount(
            <LogoButton href="test-url" />
        );
        expect(testButton.html().includes('<a href="test-url"')).toBeTruthy();
    });
});