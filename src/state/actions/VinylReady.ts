import { IState } from "../types/IState";

const vinylReadyReducer = (state: IState) => {
    return {
        ...state,
        isVinylReady: true,
    };
}

export default vinylReadyReducer;