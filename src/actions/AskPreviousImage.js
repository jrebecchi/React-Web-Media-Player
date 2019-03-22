const askPreviousImage = (state) => {
    return {
        ...state,
        askPreviousImage: new Date(),
    };
}

export default askPreviousImage;