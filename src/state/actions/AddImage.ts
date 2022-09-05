import { PayloadAction } from "@reduxjs/toolkit";
import { ISlide } from "../types/ISlide";
import { IState } from "../types/IState";


const addImageReducer = (state: IState, action: PayloadAction<{index: number, image: ISlide}>) => {
    if (state.slideshow === undefined) {
        return state;
    }
    return {
        ...state,
        slideshow: state.slideshow.map(
            (content, i) => i === action.payload.index ? { ...content, element: action.payload.image } : content
        )
    }
};

export default addImageReducer;


