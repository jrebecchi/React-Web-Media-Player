import { IState } from "../types/IState";

export const FULL_SCREEN_DISABLED = 'FULL_SCREEN_DISABLED';

export const adaptPlayerToNonFullscreen = () => ({type: FULL_SCREEN_DISABLED});

const adaptPlayerToNonFullscreenReducer = (state: IState) => {
    return {
        ...state,
        isFullscreenActivated: false
    };
}

export default adaptPlayerToNonFullscreenReducer;