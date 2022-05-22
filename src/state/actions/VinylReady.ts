import { IState } from "../types/IState";

export const vinylReady = () => ({type: 'VINYL_IS_READY'})

const vinylReadyReducer = (state: IState) => {
    return {
        ...state,
        isVinylReady: true,
    };
}

export default vinylReadyReducer;