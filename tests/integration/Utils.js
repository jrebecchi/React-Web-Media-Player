import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../../src/reducers/Reducer';

export default function createTestStore() {

    // creating a jest mock function to serve as a dispatch spy for asserting dispatch actions if needed
    const dispatchSpy = jest.fn(() => ({}));
    const reducerSpy = (state, action) => dispatchSpy(action);
    // applying thunk middleware to the the store
    const emptyStore = applyMiddleware(thunk)(createStore);
    const combinedReducers = combineReducers({ reducerSpy, reducer });
    // creating the store
    const store = emptyStore(combinedReducers);

    return { store, dispatchSpy };
}