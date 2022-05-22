import { IState } from "../types/IState";

export const UNHIGHLIGHT_PLAYER = 'UNHIGHLIGHT_PLAYER';

export const unhighlightPlayer = () => ({type: UNHIGHLIGHT_PLAYER});

const unhighlightPlayerReducer = (state: IState) => {
    return {
        ...state,
        isPlayerHighlighted: false
    };
}

export default unhighlightPlayerReducer;