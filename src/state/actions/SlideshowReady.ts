import { IState } from "../types/IState";

const slideshowReadyReducer = (state: IState) => {
    return {
        ...state,
        isSlideshowReady: true,
    };
}

export default slideshowReadyReducer;