import { IAction } from "../types/IAction";
import { IState } from "../types/IState";

export const updateVideoWidth = (volume: number) => ({ type: 'UPDATE_VOLUME', payload: { volume } });

const updateVolume = (state: IState, action: IAction) => {

  return {
    ...state,
    volume: action.payload.volume,
  };
}

export default updateVolume;