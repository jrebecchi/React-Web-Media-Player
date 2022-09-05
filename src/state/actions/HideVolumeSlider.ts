import { IState } from "../types/IState";

const hideVolumeSliderReducer = (state: IState) => {
    return {
        ...state,
        showVolumeSlider: false,
    };
}

export default hideVolumeSliderReducer;