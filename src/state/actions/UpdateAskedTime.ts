import { IAction } from "../types/IAction";
import { IState } from "../types/IState";

export const updateAskedTime = (askedTime: number | "isTreated") => ({ type: 'UPDATE_ASKED_TIME', payload: { askedTime } });

const updateAskedTimeReducer = (state: IState, action: IAction) => {

  return {
    ...state,
    askedTime: action.payload.askedTime
  };
}

export default updateAskedTimeReducer;