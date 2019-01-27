const hideCursor = (state) => {
    if (state.isFullscreen) {
        return {
            ...state,
            hideCursor: false
        };
    }
    else
        return state;
}

export default hideCursor;