import { IState } from "../types/IState";

const switchFullscreenReducer = (state: IState) => {
    const isFullscreen = !state.isFullscreen;
    return {
        ...state,
        isFullscreen: isFullscreen,
      };
}

export default switchFullscreenReducer;