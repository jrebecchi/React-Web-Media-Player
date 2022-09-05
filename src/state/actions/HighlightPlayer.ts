import { IState } from "../types/IState";

const highLightPlayerReducer = (state: IState) => {
    return {
        ...state,
        isPlayerHighlighted: true,
      };
}

export default highLightPlayerReducer;