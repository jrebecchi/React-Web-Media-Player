import { IState } from "../types/IState";

export const preventMenuHiding = () => ({type: 'PREVENT_MENU_HIDING'})

const preventMenuHidingReducer = (state: IState) => {
    return {
        ...state,
        allowMenuHiding: false,
    };
}

export default preventMenuHidingReducer;