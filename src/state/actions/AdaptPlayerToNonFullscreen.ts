import { IState } from "../types/IState";

const adaptPlayerToNonFullscreenReducer = (state: IState) => {
    return {
        ...state,
        isFullscreenActivated: false
    };
}

export default adaptPlayerToNonFullscreenReducer;