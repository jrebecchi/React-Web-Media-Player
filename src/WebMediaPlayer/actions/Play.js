const play = (state) => {
    return {
        ...state,
        isPlaying: true,
        allowMenuHiding: true
    };
}

export default play;