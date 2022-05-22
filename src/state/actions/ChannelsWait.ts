import { IState } from "../types/IState";

export const channelsWait = () => ({type: 'CHANNELS_WAIT'})

const channelsWaitReducer = (state: IState) => {
    return {
        ...state,
        channelsWait: true,
    };
}

export default channelsWaitReducer;