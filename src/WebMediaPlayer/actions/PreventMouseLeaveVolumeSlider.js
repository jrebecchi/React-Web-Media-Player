const preventMouseLeaveVolumeSlider = (state) => {
    return {
        ...state,
        allowMouseLeaveVolumeSlider: false,
        allowMenuHiding: false
      };
}

export default preventMouseLeaveVolumeSlider;