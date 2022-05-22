import { IState } from "../types/IState";

export const audioNotReady = () => ({type: 'AUDIO_IS_NOT_READY'});


const audioNotReadyReducer = (state: IState) => {
    return {
        ...state,
        isAudioReady: false,
    };
}

export default audioNotReadyReducer;