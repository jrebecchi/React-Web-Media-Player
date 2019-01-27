const adaptPlayerToNonFullscreen = (state) => {
    return {
        ...state,
        isFullscreenActivated: false
    };
}

export default adaptPlayerToNonFullscreen;