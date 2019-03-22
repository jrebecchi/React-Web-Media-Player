const updateDuration = (state, action) => {
    
    return {
        ...state,
        duration: action.payload.duration
      };
}

export default updateDuration;