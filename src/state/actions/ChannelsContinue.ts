import { IState } from "../types/IState";

export const channelsContinue = () => ({type: 'CHANNELS_CONTINUE'})

const channelsContinueReducer = (state: IState) => {
    return {
        ...state,
        channelsWait: false,
    };
}

export default channelsContinueReducer;