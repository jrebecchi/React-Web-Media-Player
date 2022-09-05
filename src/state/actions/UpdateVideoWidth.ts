import { PayloadAction } from "@reduxjs/toolkit";
import { IState } from "../types/IState";

const updateVideoWidthReducer = (state: IState, action: PayloadAction<{videoWidth: number}>):IState => {

  return {
    ...state,
    videoWidth: action.payload.videoWidth
  };
}

export default updateVideoWidthReducer;