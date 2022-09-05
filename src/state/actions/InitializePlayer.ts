import { IState } from "../types/IState";

const initializePlayerReducer = (state: IState) => {
    return {
        ...state,
        isInitialized: true,
      };
}

export default initializePlayerReducer;