import { IState } from "../types/IState";

export const HIDE_VOLUME_SLIDER = 'HIDE_VOLUME_SLIDER';

export const hideVolumeSlider = () => ({type: HIDE_VOLUME_SLIDER});

const hideVolumeSliderReducer = (state: IState) => {
    return {
        ...state,
        showVolumeSlider: false,
    };
}

export default hideVolumeSliderReducer;