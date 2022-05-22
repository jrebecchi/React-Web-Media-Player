import { IState } from "../types/IState";

export const VIDEO_IS_NOT_READY = 'VIDEO_IS_NOT_READY';

export const videoNotReady = () => ({ type: VIDEO_IS_NOT_READY });

const videoNotReadyReducer = (state: IState) => {
    return {
        ...state,
        isVideoReady: false,
    };
}

export default videoNotReadyReducer;