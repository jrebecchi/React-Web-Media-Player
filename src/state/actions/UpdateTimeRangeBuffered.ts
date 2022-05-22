import { IAction } from "../types/IAction";
import { IState } from "../types/IState";

export const UPDATE_TIME_RANGE_BUFFERED = 'UPDATE_TIME_RANGE_BUFFERED';

export const updateTimeRangeBuffered = (timeRangeBuffered: number[][]) => ({type: UPDATE_TIME_RANGE_BUFFERED, payload: { timeRangeBuffered }});

const updateTimeRangeBufferedReducer = (state: IState, action: IAction) => {
    return {
        ...state,
        timeRangeBuffered: action.payload.timeRangeBuffered,
      };
}

export default updateTimeRangeBufferedReducer;