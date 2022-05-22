import { IState } from "../types/IState";

export const unmute = () => ({type: 'UNMUTE'})

const unmuteReducer = (state: IState) => {
    return {
        ...state,
        muted: false
    };
}

export default unmuteReducer;