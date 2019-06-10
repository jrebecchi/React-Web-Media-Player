import React from 'react';
import Enzyme, { mount } from 'enzyme';
import createTestStore from '../../Utils';
import Adapter from 'enzyme-adapter-react-16';
import Timer from '../../../../src/components/MenuBar/Timer';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

describe('Integration tests - Timer', () => {

    let store;

    beforeEach(() => {
        ({ store } = createTestStore());
    });

    it('Timer - intToStingTime - duration > 3600', () => {
        const initState = {
            duration: 3600,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const timerProvider = mount(
            <Provider store={store}>
                <Timer />
            </Provider>
        );

        const timer = timerProvider.find("Timer");
        const timerInstance = timer.instance();
        expect(timerInstance.intToStingTime(3600)).toBe("1:00:00");
        expect(timerInstance.intToStingTime(0)).toBe("0:00:00");
        expect(timerInstance.intToStingTime(60)).toBe("0:01:00");
        expect(timerInstance.intToStingTime(600)).toBe("0:10:00");
        expect(timerInstance.intToStingTime(601)).toBe("0:10:01");
    });

    it('Timer - intToStingTime - duration > 3600', () => {
        const initState = {
            duration: 125,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const timerProvider = mount(
            <Provider store={store}>
                <Timer />
            </Provider>
        );

        const timer = timerProvider.find("Timer");
        const timerInstance = timer.instance();
        expect(timerInstance.intToStingTime(120)).toBe("2:00");
        expect(timerInstance.intToStingTime(0)).toBe("0:00");
        expect(timerInstance.intToStingTime(60)).toBe("1:00");
    });

    it('Timer - intToStingTime - duration > 660', () => {
        const initState = {
            duration: 660,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const timerProvider = mount(
            <Provider store={store}>
                <Timer />
            </Provider>
        );

        const timer = timerProvider.find("Timer");
        const timerInstance = timer.instance();
        expect(timerInstance.intToStingTime(660)).toBe("11:00");
        expect(timerInstance.intToStingTime(120)).toBe("02:00");
        expect(timerInstance.intToStingTime(0)).toBe("00:00");
        expect(timerInstance.intToStingTime(60)).toBe("01:00");
    });

    it('Timer - intToStingTime - duration < 60', () => {
        const initState = {
            duration: 50,
        }

        store.dispatch({ type: "INIT_STATE", payload: { state: initState } });

        const timerProvider = mount(
            <Provider store={store}>
                <Timer />
            </Provider>
        );

        const timer = timerProvider.find("Timer");
        const timerInstance = timer.instance();
        expect(timerInstance.intToStingTime(50)).toBe("0:50");
        expect(timerInstance.intToStingTime(10)).toBe("0:10");
        expect(timerInstance.intToStingTime(0)).toBe("0:00");
    });
});