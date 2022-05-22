import { IState } from "../types/IState";

export const INITIALIZE_PLAYER = 'INITIALIZE_PLAYER';

export const initializePlayer = () => ({type: INITIALIZE_PLAYER});

const initializePlayerReducer = (state: IState) => {
    return {
        ...state,
        isInitialized: true,
      };
}

export default initializePlayerReducer;