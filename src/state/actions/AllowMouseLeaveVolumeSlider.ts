import { IState } from "../types/IState";

const allowMouseLeaveVolumeSliderReducer = (state: IState) => {
  return {
    ...state,
    allowMouseLeaveVolumeSlider: true,
  };
}

export default allowMouseLeaveVolumeSliderReducer;