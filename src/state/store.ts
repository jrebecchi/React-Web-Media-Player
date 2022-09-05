import { configureStore } from '@reduxjs/toolkit'
import  reducer from './reducers/Reducer';

export const store = configureStore({reducer: {'main': reducer}});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch