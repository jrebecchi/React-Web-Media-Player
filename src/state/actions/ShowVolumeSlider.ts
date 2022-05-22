import { IState } from "../types/IState";

export const showVolumeSlider = () => ({type: 'SHOW_VOLUME_SLIDER'});


const showVolumeSliderReducer = (state: IState) => {
    return {
        ...state,
        showVolumeSlider: true,
      };
}

export default showVolumeSliderReducer;