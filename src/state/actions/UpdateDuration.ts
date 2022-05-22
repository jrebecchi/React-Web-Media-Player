import { IAction } from "../types/IAction";
import { IState } from "../types/IState";

export const updateDuration = (duration: number) => ({ type: 'UPDATE_DURATION', payload: { duration } });

const updateDurationReducer = (state: IState, action: IAction) => {

  return {
    ...state,
    duration: action.payload.duration
  };
}

export default updateDurationReducer;