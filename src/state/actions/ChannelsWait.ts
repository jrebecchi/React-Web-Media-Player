import { IState } from "../types/IState";

const channelsWaitReducer = (state: IState) => {
    return {
        ...state,
        channelsWait: true,
    };
}

export default channelsWaitReducer;