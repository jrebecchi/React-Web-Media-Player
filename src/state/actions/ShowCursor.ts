import { IState } from "../types/IState";

export const showCursor = () => ({type: 'SHOW_CURSOR'});

const showCursorReducer = (state: IState) => {
    return {
        ...state,
        showCursor: true
      };
}

export default showCursorReducer;