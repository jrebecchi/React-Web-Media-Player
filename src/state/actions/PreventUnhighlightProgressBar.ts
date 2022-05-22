import { IState } from "../types/IState";

export const preventUnhighlightProgressBar = () => ({type: 'PREVENT_UNHIGHLIGHT_PROGRESS_BAR'});

const preventUnhighlightProgressBarReducer = (state: IState) => {
    return {
        ...state,
        allowUnhighlightProgressBar: false,
      };
}

export default preventUnhighlightProgressBarReducer;