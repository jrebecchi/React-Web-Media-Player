const updateVolumeSliderLeftMargin = (state, action) => {
    
    return {
        ...state,
        volumeSliderLeftMargin: action.payload.volumeSliderLeftMargin
      };
}

export default updateVolumeSliderLeftMargin;