import { IState } from "../types/IState";

export const HIGHLIGHT_PROGRESS_BAR = 'HIGHLIGHT_PROGRESS_BAR';

export const highLightProgressBar = () => ({type: HIGHLIGHT_PROGRESS_BAR});

const highLightProgressBarReducer = (state: IState) => {
    return {
        ...state,
        highlightProgressBar: true,
      };
}

export default highLightProgressBarReducer;