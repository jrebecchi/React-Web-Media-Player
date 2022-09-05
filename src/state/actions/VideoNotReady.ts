import { IState } from "../types/IState";

const videoNotReadyReducer = (state: IState) => {
    return {
        ...state,
        isVideoReady: false,
    };
}

export default videoNotReadyReducer;