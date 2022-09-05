import { PayloadAction } from "@reduxjs/toolkit";
import { IState } from "../types/IState";

const updateDurationReducer = (state: IState, action: PayloadAction<{duration: number}>) => {

  return {
    ...state,
    duration: action.payload.duration
  };
}

export default updateDurationReducer;