import { IState } from "../types/IState";

const showMenusReducer = (state: IState) => {
    return {
        ...state,
        showMenus: true
      };
}

export default showMenusReducer;