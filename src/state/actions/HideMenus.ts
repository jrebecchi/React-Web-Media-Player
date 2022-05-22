import { IState } from "../types/IState";

export const showMenus = () => ({type: 'SHOW_MENUS'});

const hideMenus = (state: IState) => {
    return {
        ...state,
        showMenus: false
    };
}

export default hideMenus;