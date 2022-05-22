import { IState } from "../types/IState";

export const highLightProgressBar = () => ({type: 'HIGHLIGHT_PROGRESS_BAR'});

const highLightProgressBarReducer = (state: IState) => {
    return {
        ...state,
        highlightProgressBar: true,
      };
}

export default highLightProgressBarReducer;