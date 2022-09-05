import { IState } from "../types/IState";

const audioNotReadyReducer = (state: IState) => {
    return {
        ...state,
        isAudioReady: false,
    };
}

export default audioNotReadyReducer;