import { IState } from "../types/IState";

const highLightProgressBarReducer = (state: IState) => {
    return {
        ...state,
        highlightProgressBar: true,
      };
}

export default highLightProgressBarReducer;