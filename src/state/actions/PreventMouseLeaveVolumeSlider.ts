import { IState } from "../types/IState";

export const preventMouseLeaveVolumeSlider = () => ({type: 'PREVENT_MOUSE_LEAVE_VOLUME_SLIDER'});

const preventMouseLeaveVolumeSliderReducer = (state: IState) => {
  return {
    ...state,
    allowMouseLeaveVolumeSlider: false,
  };
}

export default preventMouseLeaveVolumeSliderReducer;