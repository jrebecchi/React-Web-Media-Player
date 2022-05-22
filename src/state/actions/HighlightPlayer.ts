import { IState } from "../types/IState";

export const HIGHLIGHT_PLAYER = 'HIGHLIGHT_PLAYER';

export const highLightPlayer = () => ({type: HIGHLIGHT_PLAYER});

const highLightPlayerReducer = (state: IState) => {
    return {
        ...state,
        isPlayerHighlighted: true,
      };
}

export default highLightPlayerReducer;