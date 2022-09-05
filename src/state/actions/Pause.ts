import { IState } from "../types/IState";

const pauseReducer = (state: IState) => {
    return {
        ...state,
        isPlaying: false,
      };
}

export default pauseReducer;