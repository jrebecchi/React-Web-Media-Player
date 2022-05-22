import { IState } from "../types/IState";

export const MUTE = 'MUTE';

export const mute = () => ({type: MUTE});

const muteReducer = (state: IState) => {
    return {
        ...state,
        muted: true
    };
}

export default muteReducer;