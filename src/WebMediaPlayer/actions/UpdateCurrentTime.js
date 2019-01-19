const updateCurrentTime = (state, action) => {
    
    return {
        ...state,
        currentTime: action.payload.currentTime
      };
}

export default updateCurrentTime;