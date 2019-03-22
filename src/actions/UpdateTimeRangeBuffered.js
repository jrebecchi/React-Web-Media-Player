const updateTimeRangeBuffered = (state, action) => {
    return {
        ...state,
        timeRangeBuffered: action.payload.timeRangeBuffered,
      };
}

export default updateTimeRangeBuffered;