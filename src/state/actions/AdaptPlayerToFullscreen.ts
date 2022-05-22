import { IState } from "../types/IState";

export const adaptPlayerToFullscreen = () => ({type: 'FULL_SCREEN_ENABLED'});

const adaptPlayerToFullscreenReducer = (state: IState) => {
    return {
        ...state,
        isFullscreenActivated: true,
    };
}

export default adaptPlayerToFullscreenReducer;