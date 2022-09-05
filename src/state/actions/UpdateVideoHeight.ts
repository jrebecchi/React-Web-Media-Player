import { PayloadAction } from "@reduxjs/toolkit";
import { IAction } from "../types/IAction";
import { IState } from "../types/IState";

const updateVideoHeightReducer = (state: IState, action: PayloadAction<{videoHeight: number}>) => {

  return {
    ...state,
    videoHeight: action.payload.videoHeight
  };
}

export default updateVideoHeightReducer;