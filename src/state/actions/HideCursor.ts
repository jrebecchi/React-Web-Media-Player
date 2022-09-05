import { IState } from "../types/IState";

const hideCursorReducer = (state: IState) => {
    if (state.isFullscreen) {
        return {
            ...state,
            hideCursor: false
        };
    }
    else
        return state;
}

export default hideCursorReducer;