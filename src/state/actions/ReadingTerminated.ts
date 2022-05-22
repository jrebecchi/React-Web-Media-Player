import { IState } from "../types/IState";

export const READING_TERMINATED = 'READING_TERMINATED';

export const readingTerminated = () => ({type: READING_TERMINATED});

const readingTerminatedReducer = (state: IState) => {
    return {
        ...state,
        isReadingTerminated: true,
      };
}

export default readingTerminatedReducer;