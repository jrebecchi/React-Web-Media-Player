import { IState } from "../types/IState";

const channelsContinueReducer = (state: IState) => {
    return {
        ...state,
        channelsWait: false,
    };
}

export default channelsContinueReducer;