import { IState } from "../types/IState";

const preventMenuHidingReducer = (state: IState) => {
    return {
        ...state,
        allowMenuHiding: false,
    };
}

export default preventMenuHidingReducer;