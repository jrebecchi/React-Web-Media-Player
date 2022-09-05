import { IState } from "../types/IState";

const audioReadyReducer = (state: IState) => {
    return {
        ...state,
        isAudioReady: true,
    };
}

export default audioReadyReducer;