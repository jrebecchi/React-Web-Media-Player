import { IAction } from "../types/IAction";
import { ISlide } from "../types/ISlide";
import { IState } from "../types/IState";

export const updateImageDisplayed = (imageDisplayed: ISlide) => ({type: 'UPDATE_IMAGE_DISPLAYED', payload: { imageDisplayed}});

const updateImageDisplayedReducer = (state: IState, action: IAction) => {
    
    return {
        ...state,
        imageDisplayed: action.payload.imageDisplayed
      };
}

export default updateImageDisplayedReducer;