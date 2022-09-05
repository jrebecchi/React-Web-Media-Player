import { IState } from "../types/IState";

const unhighlightPlayerReducer = (state: IState) => {
    return {
        ...state,
        isPlayerHighlighted: false
    };
}

export default unhighlightPlayerReducer;