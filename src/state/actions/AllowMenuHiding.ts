import { IState } from "../types/IState";

const allowMenuHidingReducer = (state: IState) => {
    return {
        ...state,
        allowMenuHiding: true,
    };
}

export default allowMenuHidingReducer;