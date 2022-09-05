import { IState } from "../types/IState";

const preventMouseLeaveVolumeSliderReducer = (state: IState) => {
  return {
    ...state,
    allowMouseLeaveVolumeSlider: false,
  };
}

export default preventMouseLeaveVolumeSliderReducer;