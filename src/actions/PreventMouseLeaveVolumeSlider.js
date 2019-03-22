const preventMouseLeaveVolumeSlider = (state) => {
  return {
    ...state,
    allowMouseLeaveVolumeSlider: false,
  };
}

export default preventMouseLeaveVolumeSlider;