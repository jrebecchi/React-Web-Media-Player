import { IState } from "../types/IState";

const adaptPlayerToFullscreenReducer = (state: IState) => {
    return {
        ...state,
        isFullscreenActivated: true,
    };
}

export default adaptPlayerToFullscreenReducer;