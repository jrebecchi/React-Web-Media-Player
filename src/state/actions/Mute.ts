import { IState } from "../types/IState";

const muteReducer = (state: IState) => {
    return {
        ...state,
        muted: true
    };
}

export default muteReducer;