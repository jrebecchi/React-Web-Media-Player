const pause = (state) => {
    return {
        ...state,
        isPlaying: false
      };
}

export default pause;