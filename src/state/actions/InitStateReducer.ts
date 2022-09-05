import { PayloadAction } from "@reduxjs/toolkit";
import { IState } from "../types/IState";

const initializeStateReducer = (_: IState, action: PayloadAction<IState>) => {
    return action.payload
}

export default initializeStateReducer;