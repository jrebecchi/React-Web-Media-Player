import { IState } from "../types/IState";

const showVolumeSliderReducer = (state: IState) => {
    return {
        ...state,
        showVolumeSlider: true,
      };
}

export default showVolumeSliderReducer;