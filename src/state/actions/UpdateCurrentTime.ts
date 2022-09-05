import { PayloadAction } from "@reduxjs/toolkit";
import { IState } from "../types/IState";

const updateCurrentTimeReducer = (state: IState, action: PayloadAction<{currentTime: number}>) => {

  return {
    ...state,
    currentTime: action.payload.currentTime
  };
}

export default updateCurrentTimeReducer;