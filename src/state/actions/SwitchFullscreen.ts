import { IState } from "../types/IState";

export const switchFullscreen = () => ({type: 'SWITCH_FULLSCREEN_STATE'});

const switchFullscreenReducer = (state: IState) => {
    const isFullscreen = !state.isFullscreen;
    return {
        ...state,
        isFullscreen: isFullscreen,
      };
}

export default switchFullscreenReducer;