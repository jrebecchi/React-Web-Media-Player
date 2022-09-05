import { IState } from "../types/IState";

const hideMenusReducer = (state: IState) => {
    return {
        ...state,
        showMenus: false
    };
}

export default hideMenusReducer;