import { PayloadAction } from "@reduxjs/toolkit";
import { IState } from "../types/IState";

const updateVolumeReducer = (state: IState, action: PayloadAction<{volume: number}>): IState => {
  return {
    ...state,
    volume: action.payload.volume,
  };
}

export default updateVolumeReducer;