import { IState } from "../types/IState";

const preventUnhighlightProgressBarReducer = (state: IState) => {
    return {
        ...state,
        allowUnhighlightProgressBar: false,
      };
}

export default preventUnhighlightProgressBarReducer;