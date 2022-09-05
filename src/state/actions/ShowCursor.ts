import { IState } from "../types/IState";

const showCursorReducer = (state: IState) => {
    return {
        ...state,
        showCursor: true
      };
}

export default showCursorReducer;