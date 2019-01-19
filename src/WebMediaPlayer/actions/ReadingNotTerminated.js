const readingNotTerminated = (state) => {
    return {
        ...state,
        isReadingTerminated: false
      };
}

export default readingNotTerminated;