import { IState } from "../types/IState";

export const HIDE_MENUS = 'HIDE_MENUS';

export const showMenus = () => ({type: HIDE_MENUS});

const hideMenus = (state: IState) => {
    return {
        ...state,
        showMenus: false
    };
}

export default hideMenus;