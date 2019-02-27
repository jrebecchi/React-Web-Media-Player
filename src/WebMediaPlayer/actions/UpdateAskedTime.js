const updateAskedTime = (state, action) => {
    
    return {
        ...state,
        askedTime: action.payload.askedTime
      };
}

export default updateAskedTime;