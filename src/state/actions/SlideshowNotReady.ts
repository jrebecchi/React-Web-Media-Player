import { IState } from "../types/IState";

const slideshowNotReadyReducer = (state: IState) => {
    return {
        ...state,
        isSlideshowReady: false,
    };
}

export default slideshowNotReadyReducer;