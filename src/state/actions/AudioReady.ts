import { IState } from "../types/IState";

export const audioReady = () => ({ type: 'AUDIO_IS_READY' });

const audioReadyReducer = (state: IState) => {
    return {
        ...state,
        isAudioReady: true,
    };
}

export default audioReadyReducer;