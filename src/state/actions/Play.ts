import { IState } from "../types/IState";

const playReducer = (state: IState) => {
    return {
        ...state,
        isPlaying: true,
    };
}

export default playReducer;