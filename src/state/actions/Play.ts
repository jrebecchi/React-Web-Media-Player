import { IState } from "../types/IState";

export const PLAY = 'PLAY';

export const play = () => ({type: PLAY});

const playReducer = (state: IState) => {
    return {
        ...state,
        isPlaying: true,
    };
}

export default playReducer;