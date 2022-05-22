import { IState } from "../types/IState";

export const allowUnhighlightProgressBar = () => ({type: 'ALLOW_UNHIGHLIGHT_PROGRESS_BAR'});

const allowUnhighlightProgressBarReducer = (state: IState) => {
    return {
        ...state,
        allowUnhighlightProgressBar: true,
      };
}

export default allowUnhighlightProgressBarReducer;