import { PayloadAction } from "@reduxjs/toolkit";
import { IState } from "../types/IState";

const updateVolumeSliderLeftMarginReducer = (state: IState, action: PayloadAction<{volumeSliderLeftMargin: string}>) => {
    
    return {
        ...state,
        volumeSliderLeftMargin: action.payload.volumeSliderLeftMargin
      };
}

export default updateVolumeSliderLeftMarginReducer;