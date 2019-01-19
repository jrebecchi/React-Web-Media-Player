const readingTerminated = (state) => {
    return {
        ...state,
        isReadingTerminated: true,
        isPlaying: false
      };
}

export default readingTerminated;