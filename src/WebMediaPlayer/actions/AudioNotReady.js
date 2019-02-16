const audioNotReady = (state) => {
    return {
        ...state,
        isAudioReady: false,
    };
}

export default audioNotReady;