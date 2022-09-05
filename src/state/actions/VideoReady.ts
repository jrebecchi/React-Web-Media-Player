import { IState } from "../types/IState";

const videoReadyReducer = (state: IState) => {
    return {
        ...state,
        isVideoReady: true,
    };
}

export default videoReadyReducer;