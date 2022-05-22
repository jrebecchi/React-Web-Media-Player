import { IState } from "../types/IState";

export const videoNotReady = () => ({ type: 'VIDEO_IS_NOT_READY' });

const videoNotReadyReducer = (state: IState) => {
    return {
        ...state,
        isVideoReady: false,
    };
}

export default videoNotReadyReducer;