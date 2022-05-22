import { IState } from "../types/IState";

export const SHOW_VOLUME_SLIDER = 'SHOW_VOLUME_SLIDER';

export const showVolumeSlider = () => ({type: SHOW_VOLUME_SLIDER});


const showVolumeSliderReducer = (state: IState) => {
    return {
        ...state,
        showVolumeSlider: true,
      };
}

export default showVolumeSliderReducer;