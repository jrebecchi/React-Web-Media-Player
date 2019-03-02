const updateVideoWidth = (state, action) => {
    
    return {
        ...state,
        videoWidth: action.payload.videoWidth
      };
}

export default updateVideoWidth;