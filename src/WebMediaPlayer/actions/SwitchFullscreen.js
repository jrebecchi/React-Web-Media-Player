const switchFullscreen = (state) => {
    const isFullscreen = !state.isFullscreen;
    return {
        ...state,
        isFullscreen: isFullscreen
      };
}

export default switchFullscreen;