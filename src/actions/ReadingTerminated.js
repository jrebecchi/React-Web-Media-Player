const readingTerminated = (state) => {
    return {
        ...state,
        isReadingTerminated: true,
      };
}

export default readingTerminated;