import { applyMiddleware, createStore } from 'redux';
import reducer from '../../src/reducers/Reducer';
import { TIMEOUT } from 'dns';

export default function createTestStore() {

    // creating a jest mock function to serve as a dispatch spy for asserting dispatch actions if needed
    const dispatchSpy = jest.fn(() => ({}));

    const spy = () => {
        return next => action => {
            dispatchSpy(action);
            const returnValue = next(action);
            return returnValue;
        }
    }

    const store = createStore(reducer, ['Use Redux'], applyMiddleware(spy))

    // const waitUntil = (callback, TIMEOUT) => {
    //     return new Promise((resolve, reject) => {
    //         const startTime = new Date();
    //         const id = window.setInterval(() => {
    //             if (new Date().getTime() - startTime.getTime() > TIMEOUT) {
    //                 window.clearInterval(id);
    //                 reject();
    //             } else if (callback() === true) {
    //                 window.clearInterval(id);
    //                 resolve();
    //             }
    //         }, 500);
    //     });
    // }

    return { store, dispatchSpy };
}