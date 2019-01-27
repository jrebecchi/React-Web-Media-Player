const pause = (state) => {
    return {
        ...state,
        isPlaying: false,
        allowMenuHiding: false
      };
}

export default pause;