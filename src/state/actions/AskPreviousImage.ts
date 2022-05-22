import { IState } from "../types/IState";

export const askPreviousImage = () => ({ type: 'ASK_PREVIOUS_IMAGE' });


const askPreviousImageReducer = (state: IState) => {
    return {
        ...state,
        askPreviousImage: new Date(),
    };
}

export default askPreviousImageReducer;