const updateVideoHeight = (state, action) => {
    
    return {
        ...state,
        videoHeight: action.payload.videoHeight
      };
}

export default updateVideoHeight;