import { IState } from "../types/IState";

export const SLIDESHOW_IS_NOT_READY = 'SLIDESHOW_IS_NOT_READY';

export const slideshowNotReady = () => ({ type: SLIDESHOW_IS_NOT_READY });

const slideshowNotReadyReducer = (state: IState) => {
    return {
        ...state,
        isSlideshowReady: false,
    };
}

export default slideshowNotReadyReducer;