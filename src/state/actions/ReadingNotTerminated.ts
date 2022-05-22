import { IState } from "../types/IState";

export const readingNotTerminated = () => ({type: 'READING_NOT_TERMINATED'});

const readingNotTerminatedReducer = (state: IState) => {
    return {
        ...state,
        isReadingTerminated: false,
      };
}

export default readingNotTerminatedReducer;