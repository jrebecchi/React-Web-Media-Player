import { IState } from "../types/IState";

const unhighLightProgressBarReducer = (state: IState) => {
    return {
        ...state,
        highlightProgressBar: false,
    };
}

export default unhighLightProgressBarReducer;