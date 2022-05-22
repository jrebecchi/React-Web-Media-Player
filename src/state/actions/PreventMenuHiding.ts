import { IState } from "../types/IState";

export const PREVENT_MENU_HIDING = 'PREVENT_MENU_HIDING';

export const preventMenuHiding = () => ({type: PREVENT_MENU_HIDING});

const preventMenuHidingReducer = (state: IState) => {
    return {
        ...state,
        allowMenuHiding: false,
    };
}

export default preventMenuHidingReducer;