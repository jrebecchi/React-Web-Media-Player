import { IState } from "../types/IState";

const saveActualVolumeAsPastVolumeReducer = (state: IState) => {
    
    return {
        ...state,
        pastVolume: state.volume
      };
}

export default saveActualVolumeAsPastVolumeReducer;