import { IState } from "../types/IState";

const readingNotTerminatedReducer = (state: IState) => {
    return {
        ...state,
        isReadingTerminated: false,
      };
}

export default readingNotTerminatedReducer;