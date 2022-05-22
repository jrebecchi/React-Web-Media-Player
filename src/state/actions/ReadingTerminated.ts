import { IState } from "../types/IState";

export const readingTerminated = () => ({type: 'READING_TERMINATED'});

const readingTerminatedReducer = (state: IState) => {
    return {
        ...state,
        isReadingTerminated: true,
      };
}

export default readingTerminatedReducer;