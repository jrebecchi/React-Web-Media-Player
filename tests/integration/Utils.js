import { applyMiddleware, createStore } from 'redux';
import reducer from '../../src/reducers/Reducer';

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

    return { store, dispatchSpy };
}