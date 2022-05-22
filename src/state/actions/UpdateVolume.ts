import { IAction } from "../types/IAction";
import { IState } from "../types/IState";

export const UPDATE_VOLUME = 'UPDATE_VOLUME';

export const updateVolume = (volume: number) => ({ type: UPDATE_VOLUME, payload: { volume } });

const updateVolumeReducer = (state: IState, action: IAction) => {

  return {
    ...state,
    volume: action.payload.volume,
  };
}

export default updateVolumeReducer;