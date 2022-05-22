import { IState } from "../types/IState";

export const SHOW_MENUS = 'SHOW_MENUS';

export const showMenus = () => ({type: SHOW_MENUS});

const showMenusReducer = (state: IState) => {
    return {
        ...state,
        showMenus: true
      };
}

export default showMenusReducer;