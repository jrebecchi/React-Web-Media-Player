import { IState } from "../types/IState";

export const ASK_PREVIOUS_IMAGE = 'ASK_PREVIOUS_IMAGE';

export const askPreviousImage = () => ({ type: ASK_PREVIOUS_IMAGE });


const askPreviousImageReducer = (state: IState) => {
    return {
        ...state,
        askPreviousImage: new Date(),
    };
}

export default askPreviousImageReducer;