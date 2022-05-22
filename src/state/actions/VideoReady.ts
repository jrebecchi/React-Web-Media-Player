import { IState } from "../types/IState";

export const VIDEO_IS_READY = 'VIDEO_IS_READY';

export const videoReady = () => ({type: VIDEO_IS_READY});


const videoReadyReducer = (state: IState) => {
    return {
        ...state,
        isVideoReady: true,
    };
}

export default videoReadyReducer;