import { IState } from "../types/IState";

export const videoReady = () => ({type: 'VIDEO_IS_READY'});


const videoReadyReducer = (state: IState) => {
    return {
        ...state,
        isVideoReady: true,
    };
}

export default videoReadyReducer;