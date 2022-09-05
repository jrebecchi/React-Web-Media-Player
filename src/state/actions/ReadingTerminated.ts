import { IState } from "../types/IState";

const readingTerminatedReducer = (state: IState) => {
    return {
        ...state,
        isReadingTerminated: true,
      };
}

export default readingTerminatedReducer;