import { IState } from "../types/IState";

export const ALLOW_MENU_HIDING = 'ALLOW_MENU_HIDING';

export const allowMenuHiding = () => ({type: ALLOW_MENU_HIDING});

const allowMenuHidingReducer = (state: IState) => {
    return {
        ...state,
        allowMenuHiding: true,
    };
}

export default allowMenuHidingReducer;