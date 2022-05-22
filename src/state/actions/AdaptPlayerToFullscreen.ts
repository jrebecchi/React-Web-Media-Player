import { IState } from "../types/IState";

export const FULL_SCREEN_ENABLED = 'FULL_SCREEN_ENABLED';

export const adaptPlayerToFullscreen = () => ({type: FULL_SCREEN_ENABLED});

const adaptPlayerToFullscreenReducer = (state: IState) => {
    return {
        ...state,
        isFullscreenActivated: true,
    };
}

export default adaptPlayerToFullscreenReducer;