import { IState } from "../types/IState";

export const slideshowReady = () => ({type: 'SLIDESHOW_IS_READY'});

const slideshowReadyReducer = (state: IState) => {
    return {
        ...state,
        isSlideshowReady: true,
    };
}

export default slideshowReadyReducer;