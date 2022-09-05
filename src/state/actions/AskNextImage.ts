import { IState } from "../types/IState";

const askNextImageReducer = (state: IState) => {
    return {
        ...state,
        askNextImage: new Date(),
    };
}

export default askNextImageReducer;