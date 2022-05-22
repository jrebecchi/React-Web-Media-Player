import { IState } from "../types/IState";

export const PAUSE = 'PAUSE';

export const pause = () => ({type: PAUSE});

const pauseReducer = (state: IState) => {
    return {
        ...state,
        isPlaying: false,
      };
}

export default pauseReducer;