import { IState } from "../types/IState";

export const allowMenuHiding = () => ({type: 'ALLOW_MENU_HIDING'})

const allowMenuHidingReducer = (state: IState) => {
    return {
        ...state,
        allowMenuHiding: true,
    };
}

export default allowMenuHidingReducer;