import { IState } from "../types/IState";

const allowUnhighlightProgressBarReducer = (state: IState) => {
    return {
        ...state,
        allowUnhighlightProgressBar: true,
      };
}

export default allowUnhighlightProgressBarReducer;