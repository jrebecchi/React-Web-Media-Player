const updateTimeRangeBuffered = (state, action) => {
    console.log(action.payload.timeRangeBuffered);
    return {
        ...state,
        timeRangeBuffered: action.payload.timeRangeBuffered,
      };
}

export default updateTimeRangeBuffered;