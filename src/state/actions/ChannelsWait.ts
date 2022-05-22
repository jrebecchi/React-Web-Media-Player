import { IState } from "../types/IState";

export const CHANNELS_WAIT = 'CHANNELS_WAIT';

export const channelsWait = () => ({type: CHANNELS_WAIT});

const channelsWaitReducer = (state: IState) => {
    return {
        ...state,
        channelsWait: true,
    };
}

export default channelsWaitReducer;