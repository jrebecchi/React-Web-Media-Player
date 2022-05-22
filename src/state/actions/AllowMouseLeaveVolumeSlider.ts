import { IState } from "../types/IState";

export const allowMouseLeaveVolumeSlider = () => ({type: 'ALLOW_MOUSE_LEAVE_VOLUME_SLIDER'});

const allowMouseLeaveVolumeSliderReducer = (state: IState) => {
  return {
    ...state,
    allowMouseLeaveVolumeSlider: true,
  };
}

export default allowMouseLeaveVolumeSliderReducer;