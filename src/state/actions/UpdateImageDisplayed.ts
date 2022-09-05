import { PayloadAction } from "@reduxjs/toolkit";
import { ISlide } from "../types/ISlide";
import { IState } from "../types/IState";

const updateImageDisplayedReducer = (state: IState, action: PayloadAction<{imageDisplayed: ISlide}>): IState => {
    
    return {
        ...state,
        imageDisplayed: action.payload.imageDisplayed
      };
}

export default updateImageDisplayedReducer;