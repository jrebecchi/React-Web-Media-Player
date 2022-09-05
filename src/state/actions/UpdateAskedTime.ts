import { PayloadAction } from "@reduxjs/toolkit";
import { IState } from "../types/IState";

const updateAskedTimeReducer = (state: IState, action: PayloadAction<{askedTime: number}>) => {

  return {
    ...state,
    askedTime: action.payload.askedTime
  };
}

export default updateAskedTimeReducer;