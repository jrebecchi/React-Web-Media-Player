import { IState } from "../types/IState";

export const hideCursor = () => ({type: 'HIDE_CURSOR'});

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