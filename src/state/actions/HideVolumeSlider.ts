import { IState } from "../types/IState";

export const hideVolumeSlider = () => ({type: 'HIDE_VOLUME_SLIDER'});

const hideVolumeSliderReducer = (state: IState) => {
    return {
        ...state,
        showVolumeSlider: false,
    };
}

export default hideVolumeSliderReducer;