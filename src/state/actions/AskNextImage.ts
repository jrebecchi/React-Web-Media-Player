import { IState } from "../types/IState";

export const ASK_NEXT_IMAGE = 'ASK_NEXT_IMAGE';

export const askNextImage = () => ({ type: ASK_NEXT_IMAGE });

const askNextImageReducer = (state: IState) => {
    return {
        ...state,
        askNextImage: new Date(),
    };
}

export default askNextImageReducer;