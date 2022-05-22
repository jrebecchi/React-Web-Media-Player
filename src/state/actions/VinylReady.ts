import { IState } from "../types/IState";

export const VINYL_IS_READY = 'VINYL_IS_READY';

export const vinylReady = () => ({type: VINYL_IS_READY});

const vinylReadyReducer = (state: IState) => {
    return {
        ...state,
        isVinylReady: true,
    };
}

export default vinylReadyReducer;