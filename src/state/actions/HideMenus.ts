import { IState } from "../types/IState";

export const HIDE_MENUS = 'HIDE_MENUS';

export const hideMenus = () => ({type: HIDE_MENUS});

const hideMenusReducer = (state: IState) => {
    return {
        ...state,
        showMenus: false
    };
}

export default hideMenusReducer;