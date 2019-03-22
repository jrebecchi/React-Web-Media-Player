const videoNotReady = (state) => {
    return {
        ...state,
        isVideoReady: false,
    };
}

export default videoNotReady;