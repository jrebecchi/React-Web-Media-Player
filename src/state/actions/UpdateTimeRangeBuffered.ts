import { PayloadAction } from "@reduxjs/toolkit";
import { IState } from "../types/IState";

const updateTimeRangeBufferedReducer = (state: IState, action: PayloadAction<{timeRangeBuffered: number }>): IState => {
    return {
        ...state,
        timeRangeBuffered: action.payload.timeRangeBuffered,
      };
}

export default updateTimeRangeBufferedReducer;