import { IState } from "../types/IState";

export const SHOW_CURSOR = 'SHOW_CURSOR';

export const showCursor = () => ({type: SHOW_CURSOR});

const showCursorReducer = (state: IState) => {
    return {
        ...state,
        showCursor: true
      };
}

export default showCursorReducer;