import { IState } from "../types/IState";

export const unhighLightProgressBar = () => ({type: 'UNHIGHLIGHT_PROGRESS_BAR'});

const unhighLightProgressBarReducer = (state: IState) => {
    return {
        ...state,
        highlightProgressBar: false,
    };
}

export default unhighLightProgressBarReducer;