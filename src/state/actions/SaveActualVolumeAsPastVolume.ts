import { IState } from "../types/IState";

export const SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME = 'SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME';

export const saveActualVolumeAsPastVolume = () => ({type: SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME});

const saveActualVolumeAsPastVolumeReducer = (state: IState) => {
    
    return {
        ...state,
        pastVolume: state.volume
      };
}

export default saveActualVolumeAsPastVolumeReducer;