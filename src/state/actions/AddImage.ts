import { IAction } from "../types/IAction";
import { ISlide } from "../types/ISlide";
import { IState } from "../types/IState";

export const addImage = (index: number, image: ISlide ) => ({ type: 'ADD_IMAGE', payload: { index, image  } });


const addImageReducer = (state: IState, action: IAction) => {
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


