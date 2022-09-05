import { IState } from "../types/IState";

const unmuteReducer = (state: IState) => {
    return {
        ...state,
        muted: false
    };
}

export default unmuteReducer;