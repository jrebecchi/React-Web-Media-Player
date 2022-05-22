import { IAction } from "../types/IAction";
import { IState } from "../types/IState";

export const UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME';

export const updateCurrentTime = (currentTime: number) => ({ type: UPDATE_CURRENT_TIME, payload: { currentTime } });

const updateCurrentTimeReducer = (state: IState, action: IAction) => {

  return {
    ...state,
    currentTime: action.payload.currentTime
  };
}

export default updateCurrentTimeReducer;