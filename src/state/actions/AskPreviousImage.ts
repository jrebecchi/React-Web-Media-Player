import { IState } from "../types/IState";

const askPreviousImageReducer = (state: IState) => {
    return {
        ...state,
        askPreviousImage: new Date(),
    };
}

export default askPreviousImageReducer;